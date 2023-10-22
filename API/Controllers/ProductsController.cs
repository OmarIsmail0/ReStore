using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {

        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> getProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> getProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            if (productDto.File != null)
            {
                var imageRes = await _imageService.AddImageAsync(productDto.File);
                if (imageRes.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageRes.Error.Message });
                product.PictureUrl = imageRes.SecureUrl.ToString();
                product.pubilcId = imageRes.PublicId;
            }
            _context.Products.Add(product);

            var res = await _context.SaveChangesAsync() > 0;
            if (res) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);
            return BadRequest(new ProblemDetails { Title = "Problem Creating new product" });
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);
            if (product == null) return NotFound();
            _mapper.Map(productDto, product);
            if (productDto.File != null)
            {
                var imageRes = await _imageService.AddImageAsync(productDto.File);
                if (imageRes.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageRes.Error.Message });
                if (!string.IsNullOrEmpty(product.pubilcId))
                    await _imageService.DeleteImageAsync(product.pubilcId);

                product.PictureUrl = imageRes.SecureUrl.ToString();
                product.pubilcId = imageRes.PublicId;

            }
            var res = await _context.SaveChangesAsync() > 0;
            if (res) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.pubilcId))
                await _imageService.DeleteImageAsync(product.pubilcId);


            _context.Products.Remove(product);
            var res = await _context.SaveChangesAsync() > 0;
            if (res) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem Deleting product" });
        }
    }
}
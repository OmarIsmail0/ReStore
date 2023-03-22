import * as yup from 'yup'

export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full name is Required"),
        address1: yup.string().required("Full address 1 is Required"),
        city: yup.string().required("Full city is Required"),
        state: yup.string().required("Full state is Required"),
        zip: yup.string().required("Full zip is Required"),
        country: yup.string().required("Full country is Required"),
    }),
    yup.object(),
    yup.object({
        NameOnCard: yup.string().required()
    })
] 
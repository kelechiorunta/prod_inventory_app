import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
   query Query {
                 products{
                        id
                        title
                        description
                        price
                        image
                        rating {
                          rate
                          count
                        }
                    }
    }
   
`
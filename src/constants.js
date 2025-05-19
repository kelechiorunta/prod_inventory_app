import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
   query Query {
                    auth {
                    username
                    picture
                    email
                    }
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

export const AUTH = gql`
        query Query {
                auth {
                    username
                    picture
                    email
                }
        }
`

export const CREATE_NEW_PRODUCT = gql`
          mutation CreateProductInput(
                    $title: String!
                    $price: Float!
                    $description: String!
                    $category: String!
                    $image: String!
                    $rating: RatingInput!
                    ) {
                    createNewProduct(
                        input: {
                        title: $title
                        price: $price
                        description: $description
                        category: $category
                        image: $image
                        rating: $rating
                        }
                    ) {
                        id
                        title
                    }
                    }


`
  
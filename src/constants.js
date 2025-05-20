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

export const GET_PRODUCT = gql`
    query GetProduct($id: ID!) {
                getProduct(id: $id){
                            title
                            description
                            price
                            image
                            category
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
          mutation CreateNewProduct(
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
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      title
      description
      price
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;  
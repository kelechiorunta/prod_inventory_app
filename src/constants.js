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
        subscription Auth {
                authUpdate {
                    username
                    picture
                    email
                }
        }
`
export const ON_NEW_MESSAGE = gql`
  subscription OnNewMessage($userId: String!) {
    newMessage(userId: $userId) {
      id
      content
      sender
      receiver
      createdAt
    }
  }`

  export const SEND_MESSAGE = gql`
  mutation SendMessage($sender: String!, $receiver: String!, $content: String!) {
    sendMessage(sender: $sender, receiver: $receiver, content: $content) {
      id
      sender
      receiver
      content
      createdAt
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($userId: String!, $contactId: String!) {
    messages(userId: $userId, contactId: $contactId) {
      id
      sender
      receiver
      content
      createdAt
    }
  }
`;

export const SUBSCRIBE_TO_NEW_PRODUCTS = gql`
  subscription OnNewProduct {
    notifyNewProduct {
      id
      title
      price
      category
    }
  }`

  export const SUBSCRIBE_TO_DELETE_PRODUCTS = gql`
  subscription OnDeleteProduct {
    notifyDeleteProduct {
      id
    }
  }`

  export const SUBSCRIBE_TO_SEARCHED_PRODUCTS = gql`
  subscription OnSearchProduct {
    notifySearchProduct {
      id
      title
      price
      category
    }
  }`

  export const SUBSCRIBE_TO_AUTH_USER = gql`
  subscription OnAuthentication {
    notifyAuthUser {
      username
      picture
      email
    }
  }`

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


export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id){
            acknowledged,
            deletedCount
    }
  }
`;  

export const INITIALIZE_PAYMENT = gql`
mutation InitializePayment($email: String!, $price: Float!) {
  initializePayment(email: $email, price: $price) {
    authorization_url
    access_code
    reference
  }
}

`

export const VERIFY_PAYMENT = gql`
  query VerifyPayment($token: ID!) {
    verifyPayment(token: $token) {
      reference
      amount
      status
      customerEmail
      gatewayResponse
    }
  }
`;


export const SEARCH_PRODUCT = gql`
  query SearchProduct($name: String, $category: CategoryEnum, $sort: String, $limit: Int) {
    searchProduct(name: $name, category: $category, sort: $sort, limit: $limit) {
      id
      title
      description
      price
      category
      image
    }
  }
`;

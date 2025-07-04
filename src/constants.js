import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
   query Query {
                    auth {
                    _id
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
export const GET_STOCKS = gql`
    query Query {
                getUserStocks{
                            month
                            year
                            stockIn
                            stockOut
                        }
}`;

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
      senderName
      receiverName
      senderAvatar
      receiverAvatar
      createdAt
    }
  }`;

  export const UPDATE_USER = gql`
  mutation UpdateUser($email: String!, $username: String!, $picture: String!, $password: String!) {
    updateUser(email: $email, username: $username, picture: $picture, password: $password) {
      _id
      email
      username
      picture
    }
  }
`;

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

export const NEW_INCOMING_MESSAGE = gql`
  subscription OnIncomingMessage {
    incomingMessage {
      id
      content
      senderName
    }
  }
`;

export const TYPING_INDICATOR = gql`
  subscription TypingIndicator($senderId: ID!, $receiverId: ID!) {
    typingIndicator(senderId: $senderId, receiverId: $receiverId) {
      senderId
      receiverId
      isTyping
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($userId: String!, $contactId: String!) {
    messages(userId: $userId, contactId: $contactId) {
      id
      sender
      receiver
      senderName
      receiverName
      senderAvatar
      receiverAvatar
      content
      createdAt
    }
  }
`;

export const SEND_TYPING_STATUS = gql`
  mutation SendTypingStatus($senderId: ID!, $receiverId: ID!, $isTyping: Boolean!) {
    sendTypingStatus(senderId: $senderId, receiverId: $receiverId, isTyping: $isTyping)
  }
`;

export const FETCH_USERS = gql`
  query FetchUsers($excludeId: ID!) {
    users(excludeId: $excludeId) {
      _id
      username
      picture        
    }
  }
`;

export const GET_SALES_REPORT = gql`
  query GetSalesReport {
    getSalesReport {
      month
      directSales
      retail
      wholesale
    }
  }
`;

export const FETCH_PAGINATED_PRODUCTS = gql`
query GetProducts($search: String, $page: Int, $limit: Int) {
    getProducts(search: $search, page: $page, limit: $limit) {
      id
      title
      category
      price
      rating {
        count
      }
      image
    }
    totalProducts
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

`;

export const ADD_SUPPLIER = gql`
  mutation AddSupplier($input: SupplierInput!) {
    addSupplier(input: $input) {
      id
      name
    }
  }
`;

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


// Group Chat SDL

export const GET_GROUP_MESSAGES = gql`
  query GetGroupMessages($groupId: ID!) {
    groupMessages(groupId: $groupId) {
      id
      content
      sender
      senderName
      senderAvatar
      createdAt
    }
  }
`;

// ✅ 2. Mutation: Send group message
export const SEND_GROUP_MESSAGE = gql`
  mutation SendGroupMessage($groupId: ID!, $sender: ID!, $content: String!) {
    sendGroupMessage(groupId: $groupId, sender: $sender, content: $content) {
      id
      content
      sender
      senderName
      senderAvatar
      createdAt
    }
  }
`;

// ✅ 3. Mutation: Send group typing status
export const SEND_GROUP_TYPING_STATUS = gql`
  mutation SendGroupTypingStatus($groupId: ID!, $sender: ID!, $isTyping: Boolean!) {
    sendGroupTypingStatus(groupId: $groupId, sender: $sender, isTyping: $isTyping)
  }
`;

// ✅ 4. Subscription: New group message
export const ON_NEW_GROUP_MESSAGE = gql`
  subscription OnNewGroupMessage($groupId: ID!) {
  newGroupMessage(groupId: $groupId) {
    id
    content
    sender
    senderName
    senderAvatar
    createdAt
  }
}
`;

// ✅ 5. Subscription: Group typing indicator
export const GROUP_TYPING_INDICATOR = gql`
  subscription GroupTypingIndicator($groupId: ID!) {
    groupTypingIndicator(groupId: $groupId) {
      groupId
      sender
      senderName
      isTyping
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    allUsers {
      _id
      username
      picture
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!, $memberIds: [ID!]!) {
    createGroup(name: $name, memberIds: $memberIds) {
      id
      name
      members {
        _id
        username
      }
    }
  }
`;

export const GET_GROUPS = gql`
  query MyGroups {
    myGroups {
      id
      name
      members {
        _id
        username
        picture
      }
    }
  }
`;

// WeeklySales Schema

export const GET_WEEKLY_SALES = gql`
  query GetWeeklySalesReport($weekRange: String!) {
    getWeeklySalesReport(weekRange: $weekRange) {
      weekRange
      year
      slots {
        day
        hour
        value
      }
    }
  }
`;

export const RECORD_SALE = gql`
  mutation RecordSale(
    $weekRange: String!
    $year: Int!
    $day: String!
    $hour: String!
    $amount: Int!
  ) {
    recordSale(
      weekRange: $weekRange
      year: $year
      day: $day
      hour: $hour
      amount: $amount
    ) {
      weekRange
      slots {
        day
        hour
        value
      }
    }
  }
`;

// Suppliers Schema
export const GET_SUPPLIERS = gql`
  query GetSuppliers($search: String, $page: Int, $limit: Int) {
    getSuppliers(search: $search, page: $page, limit: $limit) {
      id
      name
      email
      contact
      company
      address
      logo
    }
    totalSuppliers
  }
`;
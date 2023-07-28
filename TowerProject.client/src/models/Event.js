


export class Event {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCanceled = true
    this.type = data.type
    this.creatorId = data.creatorId
    this.category - data.category
    this.ticketCount = data.ticketCount
  }

}

// {
//   "type": "misc",
//     "_id": "64c0d6d06c45a9cfd01182e0",
//       "creatorId": "64b19f413f3cb7c6bedf6c03",
//         "name": "Bill the 'Boss' Gates",
//           "description": "Lorem Khaled Ipsum is a major key to success. How’s business? Boomin. The other day the grass was brown, now it’s green because I ain’t give up. Never surrender. To succeed you must believe. When you believe, you will succeed. It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Lion!",
//             "coverImg": "https://images.unsplash.com/photo-1619229667009-e7e51684e8e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
//               "location": "At The Social Expo Center",
//                 "capacity": 190,
//                   "startDate": "2023-08-12T07:00:00.000Z",
//                     "isCanceled": false,
//                       "category": "misc",
//                         "__v": 0,
//                           "creator": {
//     "_id": "64b19f413f3cb7c6bedf6c03",
//       "subs": [
//         "auth0|64b19f41db69514c61a44016"
//       ],
//         "email": "devzub123456@gdaadf.com",
//           "name": "devzub123456",
//             "picture": "https://s.gravatar.com/avatar/d3f34882109b9a5621213b3c0d6c4bcc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
//               "createdAt": "2023-07-14T20:17:32.784Z",
//                 "updatedAt": "2023-07-14T20:17:32.784Z",
//                   "__v": 0,
//                     "id": "64b19f413f3cb7c6bedf6c03"
//   },
//   "ticketCount": 0,
//     "id": "64c0d6d06c45a9cfd01182e0"
// }

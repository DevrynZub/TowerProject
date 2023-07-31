

export class Comment {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
    this.IsAttending = data.IsAttending
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.creator = data.creator
  }
}



// {
//   "_id": "64c33cbe573b218d043a06b2",
//     "creatorId": "64b19f413f3cb7c6bedf6c03",
//       "name": "Big Sports Game",
//         "description": "Will never, ever, be the same, again! Welcome to Raw Is Jericho! Beat me if you can, survive if I let you. That’s the bottom line because Stone Cold said so! Whatcha gonna do when Hulkamania runs wild on you! I am the ayatollah of rock n rolla! I am the best in the world. I am the best there is, the best there was, and the best there ever will be.",
//           "coverImg": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
//             "location": "At The Social Expo Center",
//               "capacity": 136,
//                 "startDate": "2023-08-17T07:00:00.000Z",
//                   "isCanceled": false,
//                     "type": "sport",
//                       "createdAt": "2023-07-28T03:57:50.733Z",
//                         "updatedAt": "2023-07-28T03:57:50.733Z",
//                           "__v": 0,
//                             "creator": {
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
//   "ticketCount": 4,
//     "id": "64c33cbe573b218d043a06b2"
// }


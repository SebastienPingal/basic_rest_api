// import justify_controller from "../../src/entities/justify/justify.controller"

// test("should justify text corectly", async () => {
//     // @ts-ignore
//     const req = new Request() 
//     const res = new Response()
    
//     req.user = {
//         id: 1,
//         email: 'test@email.com',
//         token: 'test_token',
//         created_at: new Date(),
//         word_cap: 80000,
//         word_count: 0,
//     }
//     req.body = "This is a test text"

//     res.json = jest.fn()
//     res.status = jest.fn()
//     await justify_controller.justify_text(req, res)
//     expect(res.json).toHaveBeenCalledWith({
//         words_remaining: 79996,
//         justified_text: "This  is  a  test  text"
//     })
// });
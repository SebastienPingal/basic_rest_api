import justify_router from "../../../src/entities/justify/justify.router"
import { getMockReq, getMockRes } from "@jest-mock/express"
import { Request, Response } from "express"
import justify_controller from "../../../src/entities/justify/justify.controller"
import axios, { responseEncoding } from "axios"

let token = ''

beforeAll(async () => {
    const { data } = await axios.post(
        "http://localhost:3000/token",
        { email: "bob@bob.bob" }
    )
    token = data.token
})

test("should trigger justify_controller when text/plain", async () => {
    const req = getMockReq({
        method: "POST",
        url: "/",
        headers: {
            "content-type": "text/plain",
            "authorization": `Bearer ${token}`,
        },
    })
    req.body = "This is a test text"

    const { res, next } = getMockRes({
        json: jest.fn(),
    })
    jest.mock("../../../src/entities/justify/justify.controller", () => {
        justify_text: jest.fn().mockImplementation( async() => {
            return "This is a test text"
        })
    })
    await justify_router(req, res, next)

    expect(res.json).toHaveBeenCalledWith({ words_remaining: 0, justified_text: "This is a test text" })
    })

// test("should error 400 when contentType isn't text/plain", async () => {
    
//     const req = getMockReq( {
//         headers: { "content-type": "application/json" },
//     })
//     const { res, next } = getMockRes()
//     const res = {
//         status: jest.fn(),
//         send: jest.fn(),
//     };
//     const next = jest.fn();


//     expect(res.status).toHaveBeenCalledWith(400)
//     expect(res.send).toHaveBeenCalledWith("Server requires text/plain")
// }
   
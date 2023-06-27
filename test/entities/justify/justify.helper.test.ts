import justify_helper from "../../../src/entities/justify/justify.helper"
import input from '../../fixtures/input'
import output from '../../fixtures/output'

describe("justify_helper.count_words", () => {
    it("should count the words", () => {
        expect(justify_helper.count_words('Hello Bencheur, this is a test, I hope it works')).toBe(10)
    })

    
        
})

describe("justify_helper.check_user_quota", () => {
    it("should error if cap is exceeded", () => {
        expect(() => justify_helper.check_user_quota(80000, 0, 80001)).toThrowError('Payment Required')
    })

    it("should return true if cap is not exceeded", () => {
        expect(justify_helper.check_user_quota(80000, 100, 1000)).toBe(true)
    })
})

describe("justify_helper.justify_text", () => {
    it("should justify the text to 80 character max", () => {
        const text = input
        const justified_text = justify_helper.justify_text(text)
        const justified_text_lines = justified_text.split('\n')
        justified_text_lines.forEach((line) => {
            expect(line.length).toBeLessThanOrEqual(80)
        })
    })
})
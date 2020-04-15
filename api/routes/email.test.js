const email = require("./email")

// @ponicode
describe("email.isEmailValid", () => {
    test("0", () => {
        let result = email.isEmailValid("test@wordpress.com")
        expect(result).toBe(true)
    })

    test("1", () => {
        let result = email.isEmailValid("email2")
        expect(result).toBe(false)
    })

    test("2", () => {
        let result = email.isEmailValid("test@test.fr")
        expect(result).toBe(true)
    })

    test("3", () => {
        let result = email.isEmailValid(undefined)
        expect(result).toBe(false)
    })
})

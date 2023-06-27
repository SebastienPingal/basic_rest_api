export default class justify_helper {
    static count_words(text: string): number {
        return text.split(' ').length
    }

    static check_user_quota(word_cap: number, word_count: number, words_in_text: number) {
        if (word_count + words_in_text > word_cap) {
            throw new Error("Payment Required")
        }
        return true
    }

    static justify_text(text: string) {
        const paragraphs = text.split('\n')
        const justified_paragraphs: string[] = []

        paragraphs.forEach((paragraph) => {
            const words = paragraph.trim().split(' ')
            const lines: string[] = []
            const words_to_add_spaces: string[] = []
            let line_length = 0

            words.forEach((word, index) => {
                let line = ''

                // if the line is full, I add the spaces
                if (line_length + word.length + 1 > 80) {
                    // I substract the length of the spaces from line_length because I don't want to count them
                    const line_length_without_spaces = line_length - words_to_add_spaces.length + 1
                    let spaces_to_add = 80 - line_length_without_spaces
                    const words_in_line = words_to_add_spaces.length

                    words_to_add_spaces.forEach((word_to_add_spaces, index) => {
                        line += word_to_add_spaces


                        if (index !== words_in_line - 1) {
                            const spaces_after_word = Math.ceil(spaces_to_add / (words_in_line - 1 - index))
                            line += ' '.repeat(spaces_after_word)
                            spaces_to_add -= spaces_after_word
                        }
                    })

                    words_to_add_spaces.length = 0
                    lines.push(line)
                    line = ''
                    line_length = 0
                }
                
                words_to_add_spaces.push(word)

                // I add 1 to the line_length because I add a space before each word except for the first one
                if (line_length === 0) {
                    line_length += word.length
                } else {
                    line_length += word.length + 1
                }

                // if the word is a new line, I add the spaces and reset the line_length
                if (index === words.length - 1) {
                    lines.push(words_to_add_spaces.join(' '))
                    line_length = 0
                    words_to_add_spaces.length = 0
                }
            })

            justified_paragraphs.push(lines.join('\n'))
        })

        return justified_paragraphs.join('\n')
    }
}
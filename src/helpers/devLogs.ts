export const devLogs = (title: string, content: any, chalkColor: any) => {
    console.log(chalkColor(`\n=========     ${title}     =========\n`))
    console.log(content)
    console.log(chalkColor('\n==================================\n'))

}
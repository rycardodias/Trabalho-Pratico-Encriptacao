const secret = '3b2523263132333536' //HEX '3b2523263132333536' // ASCII ;%#&12356
//chave em HEX
let message = '6c40035559535f59165d4c444e45125c5b164f4d4606535752565e5e560f06465713465e5a494f06575b545d421b4a4d06455a56155a5a4b474f5f5513524454504d42421e1342531b564b475d5e13535f5c4d5706585c13415e5e05454f545e5746165a4b4706585c13415e5e05505243575641451705544311415b545a5705454f565a47155f5505574e54125b5c5a57561806465713465e5a494f065f574550441b56565443575d5153490903475f561350405e4b034f571e13425e52464b067812575a16554a5706575d4115571b484c4b545c4715545e494a4347571f1542534c500658415f54585f054c5411531359574942460641534141165443034f45124450445e05505353584652574f404706505c5715454f445150585c5419164f4d4648115d4647167e48534f4357135753424a4d4211465b5016484042551d1252475b5e4103475f561352435a5747435512514c164f4d460673405a415f484d03405d5756411a1b524c535d5613565749575a065e5c13415e5e055052434754525a5e0903535f465a591a1b4c4d06765d5712451b424c495512475c5b5e0903525957135b534c055449435e5719164c4c574e11535f591652515006415d4450441b444d42115f5a525e4f09035545574346165d4a51525912475a164f4d460643574056435e0542485512475d531b494a44544052415f544b03495712475d531b4a4f421f'

function convertHexToDecimal(hex) {
    return parseInt(hex, 16)
}

function compareRows(padding) {
    //compara os HEX por linha com padding 2 a 2 
    //- se forem iguais soma ao total de coincidencias da linha
    let totalMatches = 0
    for (let i = 0; i < message.length; i += 2) {
        let msgHex = message[i] + message[i + 1]
        let paddingHex = message[i + padding] + message[i + padding + 1]
        if (msgHex === paddingHex)
            totalMatches += 1
    }
    return totalMatches
}

//cria um array de objetos com a indicação da linha de padding e o total de iguais
let totalByLine = []
for (let i = 2; i < message.length; i += 2) {
    let total = compareRows(i)
    totalByLine.push({ line: i, total: total })
}

// cria um array apartir do anterior apenas com as linhas com maior numero de igualdades
//neste caso valores superiores a 15 combinações iguais por linha
const greaterNumbers = totalByLine.filter(item => item.total > 15)

//com as comparações finais significativas faço uma média de espaços entre igualdades
let sumCompare = 0
for (let i = 0; i < greaterNumbers.length - 1; i++) {
    sumCompare += greaterNumbers[i + 1].line - greaterNumbers[i].line
}
//a média obtida é provavel que seja o tamanho de caracteres do secret
//é preciso ter em conta que está em HEX, logo o valor é metade em caracteres ASCII
const secretSize = sumCompare / (greaterNumbers.length - 1)
console.log(secretSize)


// --------------- DESENCRIPTACAO DEPOIS DE SABER O SECRET ---------------- //
let decryptedMessage = ''
let secretPosition = 0

for (let i = 0; i < message.length; i += 2) {
    if (secretPosition > secret.length - 1) secretPosition = 0
    // faz a junção dos caracteres 2 a 2
    let secretHex = secret[secretPosition] + secret[secretPosition + 1]
    let messageHex = message[i] + message[i + 1]
    // faz o XOR com os 2 numeros que representam os codigos ASCII
    let xor = convertHexToDecimal(secretHex) ^ convertHexToDecimal(messageHex)
    // converte o código ASCII para caracter
    let caracter = String.fromCharCode(xor)

    decryptedMessage += caracter

    secretPosition += 2
}

// console.log(decryptedMessage)
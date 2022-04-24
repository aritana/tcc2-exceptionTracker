import { getFile } from '../index.js';


const arrayResult = [{
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
}]


describe('getFile::', () => {
    it('should be a function', () => {
        expect(typeof getFile).toBe('function');
    })

    it('should return array of results', async () => {

        const result = await getFile('/home/aritana/Downloads/Cefet/cefet2021-b/Tcc1/code/tcc2-exceptionTracker/NodeAlura/yourFirstLibrary/test/files/text1.md');

        expect(result).toEqual(arrayResult);


    })
    it('Should return message: There is not file in the given path!', async () => {

        const result = await getFile('/home/aritana/Downloads/Cefet/cefet2021-b/Tcc1/code/tcc2-exceptionTracker/NodeAlura/yourFirstLibrary/test/files/text1_withoutLink.md');

        expect(result).toBe('there are no links');

    })
    it('shold throws error in the absence of the file', async () => {
        await expect(getFile('/')).rejects.toThrow(/There is not file in the given path!/)
    })
    it('should solve the function with sucess', async () => {
        await expect(getFile('/home/aritana/Downloads/Cefet/cefet2021-b/Tcc1/code/tcc2-exceptionTracker/NodeAlura/yourFirstLibrary/test/files/text1_withoutLink.md')).resolves.toEqual(arrayResult)
    })
})


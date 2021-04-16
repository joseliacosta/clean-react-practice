import {AxiosHttpClient} from './axios-http-client'
import {mockAxios} from '@/infra/test/mock-axios'
import {mockPostRequest} from '@/data/test/mock-http-post'
import axios from 'axios'

jest.mock('axios')
type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios,
  }
}

describe('Axios Http Client', () => {
  it('should call Axios with correct URL, verb and body', async () => {
    const request = mockPostRequest()
    const {sut, mockedAxios} = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct body and status code', () => {
    const {sut, mockedAxios} = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})

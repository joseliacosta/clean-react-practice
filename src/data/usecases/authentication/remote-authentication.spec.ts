import { HttpPostClientSpy } from '../../test/mock-http-client'
import {RemoteAuthentication} from './remote-authentication'
type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}
const makeSut = (url: string = 'login_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return { sut, httpPostClientSpy}
}
describe('Remote Authentication', () => {
  it('should call httpClient with correct URL', async () => {
    const url = 'other_url'
    const {sut, httpPostClientSpy} = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})

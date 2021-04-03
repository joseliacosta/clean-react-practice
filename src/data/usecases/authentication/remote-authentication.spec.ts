import { HttpPostClientSpy } from '../../test/mock-http-client'
import {RemoteAuthentication} from './remote-authentication'

describe('Remote Authentication', () => {
  it('should call httpClient with correct URL', async () => {

    const url = 'login_url'
    const httpPostClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClient)
    await sut.auth()
    expect(httpPostClient.url).toBe(url)
  })
})

import {HttpResponse, HttpStatusCode} from '@/data/protocols/http/http-response'
import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client'

export class HttpPostClientSpy<T, Response>
  implements HttpPostClient<T, Response> {
  url?: string
  body?: T
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok,
  }

  async post(params: HttpPostParams<T>): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}

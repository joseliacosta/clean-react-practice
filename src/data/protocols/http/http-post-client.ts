import {HttpResponse} from './http-response'
export type HttpPostParams<T> = {
  url: string
  body?: T
}
export interface HttpPostClient<T, Response> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<Response>>
}

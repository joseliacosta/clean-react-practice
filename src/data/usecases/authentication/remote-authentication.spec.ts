import {AccountModel} from './../../../domain/models/account-model'
import {AuthenticationParams} from '@/domain/usecases/authentication'
import {HttpPostClientSpy} from '@/data/test/mock-http-client'
import {HttpStatusCode} from '@/data/protocols/http/http-response'
import {InvalidCredentialsError} from '@/domain/errors/invalid-credentials-error'
import {mockAuthentication} from '@/domain/test/mock-authentication'
import {UnexpectedError} from '@/domain/errors/unexpector-error'
import {RemoteAuthentication} from './remote-authentication'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {sut, httpPostClientSpy}
}
describe('Remote Authentication', () => {
  it('should call httpClient with correct URL', async () => {
    const url = faker.internet.url()
    const {sut, httpPostClientSpy} = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call httpClient with correct body', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  it('should throw InvalidCredentialError when HttpPostClient returns 401', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    httpPostClientSpy.response = {statusCode: HttpStatusCode.unauthorized}
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw Unexpected error when HttpPostClient returns 400', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    httpPostClientSpy.response = {statusCode: HttpStatusCode.badRequest}
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  it('should throw Unexpected error when HttpPostClient returns 404', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    httpPostClientSpy.response = {statusCode: HttpStatusCode.notFound}
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  it('should throw Unexpected error when HttpPostClient returns 500', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    httpPostClientSpy.response = {statusCode: HttpStatusCode.serverError}
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})

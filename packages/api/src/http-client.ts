import axios, { AxiosError } from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export const isAxiosError = (value: unknown): value is AxiosError => axios.isAxiosError(value);

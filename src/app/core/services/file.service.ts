import { Injectable } from '@angular/core';
import { FileModel } from '../models/file.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const FILES_URL = `${environment.apiRoot}/api/v1/files`;
@Injectable()
export class FileService {

  constructor(private httpClient: HttpClient) { }

  getById(id: string) {
    return this.httpClient.get<FileModel>(`${FILES_URL}/${id}`);
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileModel>(FILES_URL, formData);
  }

  download(id: string) {
    return this.httpClient.get(`${FILES_URL}/dowmload`, {
      responseType: 'blob'
    })
  }
}

export interface FileModel {
    id: string;
    blobId: string;
    name: string;
    path: string;
    format: string;
    length: number;
    createdBy: string;
    createdAt: Date;
    modifiedAt: Date;
}
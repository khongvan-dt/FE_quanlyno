import axios from 'axios';

export class UploadService {
  selectedImageMap: { [key: string]: string | null } = {};

  onFileSelected(event: any, key: string,urlLinlApi: string): void{
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post<any>(
        urlLinlApi,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('File uploaded successfully');
        console.log('Response:', response);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.selectedImageMap[key] = reader.result as string;
        };

      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  }
  clearSelectedImage(key: string) {
    this.selectedImageMap[key] = null;
    const inputFile: HTMLInputElement | null = document.querySelector(
      `input[name="${key}"]`
    );
    if (inputFile) {
      inputFile.value = '';
    }
  }
}

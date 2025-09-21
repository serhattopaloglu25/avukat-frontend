import mockApiService from './mock-api.service';

// Backend çalışmadığı için şimdilik mock service kullanıyoruz
export const apiService = mockApiService;
export default apiService;

/* 
  Backend hazır olduğunda bu dosyayı aşağıdaki gibi güncelleyin:
  
  import realApiService from './real-api.service';
  export const apiService = realApiService;
*/

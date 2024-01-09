const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'KHÓA HỌC', uid: 'course', sortable: true },
  { name: 'BÀI TẬP', uid: 'exercise', sortable: true },
  { name: 'HỌC VIÊN', uid: 'student', sortable: true },
  { uid: 'score', name: 'ĐIỂM', sortable: true },
  { uid: 'files', name: 'BÀI TẬP ĐÍNH KÈM', sortable: false },
  { name: 'HÀNH ĐỘNG', uid: 'actions' },
];

const statusOptions = [
  { name: 'đang hoạt động', uid: 'false' },
  { name: 'vô hiệu hóa', uid: 'true' },
];

export { columns, statusOptions };

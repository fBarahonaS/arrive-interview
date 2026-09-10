const AlertComponent = ({ message, type }: {
  message: string;
  type: 'error' | 'success' | 'info';
}) => {
  const bgColor = {
    error: '#F87171',
    success: '#34D399',
    info: '#F3F4F6',
  };

  return (
    <div className="alert" style={{ backgroundColor: bgColor[type] }}>
      {message}
    </div>
  );
};

export default AlertComponent;

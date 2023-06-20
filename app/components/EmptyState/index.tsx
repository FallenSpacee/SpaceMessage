const EmptyState = () => {
  return (
    <div
      className="
    px-4 
    py-10
    sm:px-6
    lg:px-8
    h-full
    flex 
    items-center 
    justify-center
    bg-[#B19CD9]
    "
      style={{
        backgroundImage: `url('https://klike.net/uploads/posts/2022-11/1668415312_3-25.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center items-center flex flex-col">
        <h3 className="mb-[215px] text-2xl font-semibold text-purple-500 max-lg:hidden">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;

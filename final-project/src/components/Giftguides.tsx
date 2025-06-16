const Giftguides = () => {
  return (
    <div className="flex justify-center items-center gap-2 pt-15 px-15">
      <section className="relative h-[700px] w-full max-w-[600px]">
        <img
          src="/home/female-model.jpg"
          alt=""
          className="h-full w-full object-cover rounded-l-xl"
        />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col justify-center items-start md:items-center gap-1">
          <h1 className="text-3xl text-white">WOMEN</h1>
          <h1 className="text-3xl text-white">GIFT GUIDES</h1>
          <p className="text-lg underline font-bold text-white">Find out more</p>
        </div>
      </section>

      <section className="relative h-[700px] w-full max-w-[600px]">
        <img
          src="/home/male-model.jpg"
          alt=""
          className="h-full w-full object-cover rounded-r-xl"
        />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col justify-center items-start md:items-center gap-1">
          <h1 className="text-3xl text-black">MEN</h1>
          <h1 className="text-3xl text-black">GIFT GUIDES</h1>
          <p className="text-lg underline font-bold text-black">Find out more</p>
        </div>
      </section>
    </div>
  )
}

export default Giftguides
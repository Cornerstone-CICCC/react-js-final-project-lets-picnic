
const Mediasearch = () => {
  return (
    <div className="flex flex-col items-center bg-neutral-200 dark:bg-neutral-800 dark:text-white p-10">
        <section className="text-center w-10/12 md:w-8/12">
            <h1 className="text-4xl md:text-5xl">Search through more than 11</h1>
            <h1 className="text-4xl md:text-5xl">million social media profiles</h1>
            <p className="text-xl md:text-sm tracking-tight text-slate-600 dark:text-slate-400 font-bold p-7">Heepsy's search filters help you find exactly what you're looking for, and our influencer reports provide you with the metrics.</p>
        </section>
        <section className="flex justify-between items-center gap-6 md:gap-12">
            <div className="text-center p-3">
                <p className="text-2xl font-bold">2260</p>
                <p className="flex items-center justify-center min-h-[2.5rem] text-sm tracking-tight text-slate-600 dark:text-slate-400 font-bold">Satisfied Brands</p>
            </div>
            <div className="text-center p-3">
                <p className="text-2xl font-bold">1342</p>
                <p className="flex items-center justify-center min-h-[2.5rem] text-sm tracking-tight text-slate-600 dark:text-slate-400 font-bold">Satisfied Clients</p>
            </div>
            <div className="text-center p-3">
                <p className="text-2xl font-bold">3453</p>
                <p className="flex items-center justify-center min-h-[2.5rem] text-sm tracking-tight text-slate-600 dark:text-slate-400 font-bold">Sponsored</p>
            </div>
            <div className="text-center p-3">
                <p className="text-2xl font-bold">9786</p>
                <p className="flex items-center justify-center min-h-[2.5rem] text-sm tracking-tight text-slate-600 dark:text-slate-400 font-bold">Completed</p>
            </div>
        </section>
    </div>
  )
}

export default Mediasearch


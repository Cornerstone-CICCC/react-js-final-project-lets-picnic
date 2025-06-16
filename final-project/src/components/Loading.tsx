import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-100 dark:bg-neutral-900/50 '>
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground"/>
    </div>
  )
}

export default Loading;
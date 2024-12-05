export const BlogSkeleton=()=>{
    
      return (
        <div className="w-screen max-w-screen-md p-4 pt-3 pb-10 border-b cursor-pointer border-slate-200">
          <div className="flex pt-5 animate-pulse">
            <div className="flex flex-col justify-center">
              <div className="w-8 h-8 rounded-full bg-slate-300"></div>
            </div>
            <div className="flex flex-col justify-center pl-2 text-sm font-light">
              <div className="w-24 h-4 rounded bg-slate-300"></div>
            </div>
            
            <div className="flex flex-col justify-center pl-2 text-sm font-extralight text-slate-400">
              <div className="w-16 h-4 rounded bg-slate-300"></div>
            </div>
          </div>
          <div className="pt-2 text-xl font-bold">
            <div className="w-3/4 h-6 rounded bg-slate-300"></div>
          </div>
          <div className="font-thin text-md">
            <div className="w-5/6 h-4 rounded bg-slate-300"></div>
          </div>
          <div className="text-sm font-thin text-slate-500">
            <div className="w-32 h-4 rounded bg-slate-300"></div>
          </div>
        </div>
      );
    };
    
    
    
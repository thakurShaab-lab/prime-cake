import Image from "next/image"

export default function Welcome() {
  return (
    <div className="bg-[#f1ede5] m-0">
      <div className="max-w-330 mx-auto relative px-3">
        
        <div className="flex flex-wrap">

          <div className="hidden md:block md:w-1/2">
            <div className="overflow-hidden">
              <Image
                src="/wlcm_img1.jpg"
                alt="welcome"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="py-3 mx-10 lg:py-5 my-3 w-[93%]">

              <div className="my-16">
                <p className="text-[1em] leading-none pb-1 text-[#575757] font-medium">
                  Welcome to
                </p>

                <h1 className="text-[2.2em] leading-[1.1em] text-[#a68849] font-bold">
                  Prime Cake Household Utensils Trading L.L.C
                </h1>

                <p className="mt-3 font-medium">
                  Mix, Whisk, Create- We Supply the Magic
                </p>
              </div>

              <div className="mt-3 overflow-hidden font-medium text-black text-[1.01em] leading-[1.5em] h-46 opacity-80">
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
                  sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                </p>
              </div>

              <p className="mt-3 text-left uppercase">
                <a className="inline-block px-4 py-2 rounded-md font-semibold border border-black hover:bg-black hover:text-white transition cursor-pointer">
                  Read More
                </a>
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
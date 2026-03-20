import Image from "next/image"

export default function CollectSection() {
  return (
    <div
      className="overflow-hidden pt-4 bg-[#f1ede5] bg-no-repeat bg-center min-h-154.25"
      style={{ backgroundImage: "url('/collection_bg.jpg')" }}
    >
      <div className="max-w-330 mx-auto relative px-3">

        <div className="p-2 md:p-4">
          <div className="flex flex-wrap">

            <div className="w-full md:w-1/2 lg:w-[58.333%]">
              <div className="my-6.25">
                <Image
                  src="/collection_img.png"
                  alt="collection"
                  width={700}
                  height={500}
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-[41.666%]">
              <div className="mt-3 p-0 md:p-3 lg:p-5">

                <h2 className="text-[3em] leading-[1.1em] text-[#404041] font-medium capitalize">
                  Edible Printing Services
                </h2>

                <p className="mt-3 text-[1.2em] leading-[1.2em] opacity-60 font-medium">
                  Decor for you or someone else.
                </p>

                <p className="mt-3 text-[1.04em] leading-relaxed text-gray-600 opacity-70 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <p className="mt-3 md:mt-5 text-left uppercase">
                  <a className="inline-flex items-center bg-white text-[#404041] px-3.5 py-3 rounded-md font-semibold transition hover:bg-[#a68849] hover:text-white group">

                    <span className="w-4.25 h-0.5 border-t border-black mr-2 transition group-hover:border-white"></span>

                    Explore More
                  </a>
                </p>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
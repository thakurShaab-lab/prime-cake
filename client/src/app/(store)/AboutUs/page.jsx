export default function AboutPage() {
    return (
        <div>
            <div>
                <img
                    src="/inner_bnr.jpg"
                    alt="Banner"
                    className="w-full"
                />
            </div>
            <div className="bg-gray-100 py-2">
                <div className="max-w-330 mx-auto px-3">
                    <ol className="flex text-sm">
                        <li>
                            <a href="/" className="text-[#a68849]">Home</a>
                        </li>
                        <li className="mx-2">/</li>
                        <li className="text-gray-500">About Us</li>
                    </ol>
                </div>
            </div>
            <div className="my-3">
                <div className="max-w-330 mx-auto px-3">

                    <div className="text-[#333] text-[1em] leading-[1.6em] min-h-100 mb-5">
                        <h1 className="text-[#231f20] font-semibold text-[2.2em] leading-[1.4em] mb-2">
                            About Us
                        </h1>
                        <p>

                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes...

                            <br /><br />

                            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum...

                            <br /><br />

                            Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing...
                        </p>
                        <ul className="list-disc ml-5 my-5">
                            <li>Full-fledged engineering and construction solutions</li>
                            <li>State-of-the-art, well-equipped fabrication yard</li>
                            <li>Highly-skilled and experienced technical crew</li>
                        </ul>
                        <ol className="list-decimal ml-5 my-5">
                            <li>Architectural and structural steel installation services</li>
                            <li>Project mobilization, planning & engineering services</li>
                        </ol>

                    </div>

                </div>
            </div>

        </div>
    );
}
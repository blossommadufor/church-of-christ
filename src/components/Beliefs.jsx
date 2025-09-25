import React from "react";
import img from "../../public/assets/logo3.png";

const Beliefs = () => {
  return (
    <div className="py-20 xl:px-20 lg:px-14 md:px-10 px-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0 pb-20">
        <div className="lg:w-[50%] text-gray-700">
          <h2 className="text-4xl text-primary font-bold pb-4">
            WHAT WE BELIEVE IN
          </h2>
          <p>
            We believe there is one divine Being who has existed eternally. He
            exists and reveals Himself to humanity in three equally divine
            personalities: the Father, the Son, and the Holy Spirit. He desires
            a personal relationship with each of us and views each of us as His
            child.{" "}
          </p>
          <p>
            {" "}
            Jesus is the eternal Son of God. He was conceived by the Holy Spirit
            and born of a virgin - Mary. His sinless life allowed Him to be the
            perfect sacrifice for humanity. He died on the cross to atone for
            our sins, and after three days, He rose from the dead in triumph
            over eternal death. He ascended to Heaven and will return again
            someday to reward His believers with the promise of eternal life.
          </p>
          <p>
            {" "}
            Through Jesus alone is salvation for all mankind. There is no
            Saviour besides Him, and no one can enter into God’s promise for
            salvation without the salvation offered by Jesus.
          </p>
        </div>
        <div className="md:w-[35%] flex justify-center items-center">
          <img src={img} alt="" />
        </div>
      </div>

      <div className="">
        <h2 className="text-4xl text-primary font-bold pb-4">
          BASIS FOR BELIFS
        </h2>
        <p className="text-gray-700 pb-4 font-bold">
          The sole source of our faith is the Bible, the original text of which
          is uniquely inspired by God, without error; and the final authority on
          all matters.
        </p>
        <ul className="list-disc ml-10 text-light">
          <li className="text-gray-700">
            We believe unequivocally in the authority of the Holy Scriptures in
            all matters pertaining to faith, doctrine and practice (2 Tim.
            3:16-17).{" "}
          </li>
          <li className="text-gray-700">
            We believe that there is only one true God, and this God is one in
            essence and three in person, namely, the Father, the Son, and the
            Holy Spirit (Eph. 4:4-6).{" "}
          </li>
          <li className="text-gray-700">
            We believe that God the Father created and continues to uphold the
            Universe by and through His Son (Col. 1:16-17).{" "}
          </li>

          <li className="text-gray-700">
            We believe Jesus Christ is the Son of God, the Saviour of mankind,
            and the sole mediator between God and man (1 John 4:14).
          </li>
          <li className="text-gray-700">
            We believe in the complete deity and humanity of Christ Incarnate,
            His virgin birth, His sinless life, His miracles, His vicarious and
            propitiatory sacrifice, His bodily resurrection, His ascension to
            the right hand of the Father in heaven, His present rule as Head of
            the Church, and His personal return in power and glory on the final
            day (Matt. 16:27).
          </li>

          <li className="text-gray-700">
            We believe that salvation is open to all people who avail themselves
            of God’s grace through obedient faith in Christ. Obedient faith must
            include belief in God and His Word, repentance from sin, confession
            of Jesus Christ as Lord and Son of God, baptism for remission of
            past sins, and a life of growing consecration and dedication (Gal.
            5:16-26).
          </li>
          <li className="text-gray-700">
            We believe that Christian baptism is the full immersion of a
            believer in water in the name of the Father, the Son, and the Holy
            Spirit (Matt. 28:19).
          </li>
          <li className="text-gray-700">
            We believe the Lord’s Supper is the commemoration of Christ’s death
            until He comes. We believe the Lord’s Supper should be observed
            every first day of the week and only on the first day of the week,
            and should be preceded by solemn self-examination (Acts 20:7).
          </li>
          <li className="text-gray-700">
            We believe that psalms, hymns, and spiritual songs should be sung
            without the accompaniment of mechanical instruments (Eph. 5:19)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Beliefs;

import Image from "next/image";
import dashboardImg from "@/assets/images/build-with-ai-dashboard.png";

/**
 * Product visual — Apple / Stripe depth language:
 * thin edge, quiet light, soft contact shadow. No heavy glow.
 */
export function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[40rem] lg:max-w-none">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-5 left-[12%] right-[12%] h-10 rounded-[100%] bg-[#151C4B]/[0.12] blur-2xl"
      />

      <figure className="bwa-float relative m-0">
        {/* Slim device edge */}
        <div className="rounded-[1.35rem] bg-[#151C4B] p-[5px] shadow-[0_1px_2px_rgba(21,28,75,0.06),0_18px_40px_-20px_rgba(21,28,75,0.35),0_40px_80px_-36px_rgba(21,28,75,0.28)] sm:rounded-[1.55rem] sm:p-[6px]">
          <div className="overflow-hidden rounded-[1.1rem] bg-white sm:rounded-[1.25rem]">
            <Image
              src={dashboardImg}
              alt="AI leads management dashboard — track positive, neutral, and negative leads with scores and filters"
              className="block h-auto w-full"
              sizes="(max-width: 1024px) 94vw, 720px"
              quality={95}
              priority
            />
          </div>
        </div>
      </figure>
    </div>
  );
}

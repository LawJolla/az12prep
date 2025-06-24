import { Icons } from "@/components/icons";
import { OrbitingCircles } from "@/components/ui/orbiting-circle";
import Image from "next/image";

export function SecondBentoAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-20"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 size-16 border border-gray-700  p-2 rounded-full z-30 md:bottom-0 md:top-auto">
        <Image src="/az12preplogo.webp" alt="AZ12Prep" width={50} height={50} />
      </div>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
          <OrbitingCircles
            index={0}
            iconSize={60}
            radius={100}
            reverse
            speed={1}
          >
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/1907883838912733184/svVpzPHB_400x400.jpg" alt="Ben1White" width={50} height={50} />
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/1700940839902699520/6XCpF49Y_400x400.jpg" alt="Jason Scheer" width={50} height={50} />
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/1795551772951670784/7XvlCTWc_400x400.jpg" alt="Mike Luke" width={50} height={50} />
            {/* <Icons.boat />
            <Icons.supabase />
            <Icons.figma /> */}
          </OrbitingCircles>

          <OrbitingCircles index={1} iconSize={60} speed={0.5}>
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/1898540686489853952/JdJuy-Gl_400x400.jpg" alt="Ben1White" width={50} height={50} />
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/2276538149/9xuq0x1w6ti8xgkbklkv_400x400.jpeg" alt="Jason Scheer" width={50} height={50} />
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/1755328194650267649/H9i42sGL_400x400.jpg" alt="Mike Luke" width={50} height={50} />
            {/* <Icons.workos />
            <Icons.runwayml />
            <Icons.gemini /> */}
          </OrbitingCircles>

          <OrbitingCircles
            index={2}
            iconSize={60}
            radius={230}
            reverse
            speed={0.5}
          >
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/1898540686489853952/JdJuy-Gl_400x400.jpg" alt="Ben1White" width={50} height={50} />
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/2276538149/9xuq0x1w6ti8xgkbklkv_400x400.jpeg" alt="Jason Scheer" width={50} height={50} />
            <Image className="rounded-full" src="https://pbs.twimg.com/profile_images/1755328194650267649/H9i42sGL_400x400.jpg" alt="Mike Luke" width={50} height={50} />
            {/* <Icons.vercel />
            <Icons.replit />
            <Icons.posthog /> */}
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}

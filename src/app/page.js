import HomaImage from '@/components/HomaImage'
import Homepages from '@/components/Homepages'
import HowItWorks from '@/components/HowItWorks '
import WhyStudyNook from '@/components/WhyStudyNook '

export default async function Home() {
	return (
		<div>
			<HomaImage></HomaImage>
			<Homepages />
			<HowItWorks></HowItWorks>
			<WhyStudyNook></WhyStudyNook>
		</div>
	)
}

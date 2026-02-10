import { InvestmentLifecycle } from "@/components/block/investment-lifecycle/InvestmentLifecycle";
import { Company } from "@/components/block/company/Company";
import { ContactForn } from "@/components/block/contact-form/ContactForn";
import { Footer } from "@/components/block/footer/Footer";
import { RiskManagement } from "@/components/block/risk-management/RiskManagement";
import Header from "@/components/block/header/Header";
import { Hero } from "@/components/block/hero/Hero";
import { OurPartners } from "@/components/block/our-partners/OurPartners";
import { OurProjects, type Project } from "@/components/block/our-projects/OurProjects";
import { OurTeam } from "@/components/block/our-team/OurTeam";
import { OurSevices } from "@/components/block/our-services/OurSevices";
import { Spain } from "@/components/block/spain/Spain";
import { WhyChooseUs } from "@/components/block/why-choose-us/WhyChooseUs";

export default function Home() {
    // TODO: загружать проекты из БД и передавать в OurProjects
    const projects: Project[] = [];

    return (
        <div className="flex flex-col bg-white p-0 m-0">
            <Header />
            <Hero />
            <Company />
            <Spain />
            <OurSevices />
            <WhyChooseUs />
            <OurProjects projects={projects} />
            <OurPartners />
            <InvestmentLifecycle />
            <RiskManagement />
            <OurTeam />
            <ContactForn />
            <Footer />
        </div>
    );
}

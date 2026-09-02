import MiningHero from "@/features/mining/MiningHero";
import WalletCard from "@/features/wallet/WalletCard";
import TransactionList from "@/features/wallet/TransactionList";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MiningHero />

      <section className="max-w-xl mx-auto px-6 pb-16 flex flex-col gap-6">
        <WalletCard />

        <div>
          <h2 className="font-semibold text-lg mb-3">Recent Activity</h2>
          <TransactionList />
        </div>
      </section>
    </main>
  );
}

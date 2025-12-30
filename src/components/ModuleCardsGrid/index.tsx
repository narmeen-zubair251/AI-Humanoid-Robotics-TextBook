import type {ReactNode} from 'react';
import ModuleCard from '@site/src/components/ModuleCard';
import styles from './styles.module.css';

type ModuleItem = {
  title: string;
  description: string;
  path: string;
};

type ModuleCardsGridProps = {
  modules: ModuleItem[];
};

export default function ModuleCardsGrid({modules}: ModuleCardsGridProps): ReactNode {
  return (
    <section className={styles.moduleCardsGrid}>
      {modules.map((module, index) => (
        <ModuleCard
          key={index}
          title={module.title}
          description={module.description}
          path={module.path}
        />
      ))}
    </section>
  );
}
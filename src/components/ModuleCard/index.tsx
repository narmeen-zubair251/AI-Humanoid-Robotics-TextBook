import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ModuleCardProps = {
  title: string;
  description: string;
  path: string;
};

export default function ModuleCard({title, description, path}: ModuleCardProps): ReactNode {
  return (
    <div className={styles.moduleCard}>    
  <div className={styles.cardContentWrapper}> 
    <h3 className={styles.moduleCardTitle}>{title}</h3>
    <p className={styles.moduleCardDescription}>{description}</p>
    <Link className={styles.moduleCardButton} to={useBaseUrl(path)}>Start Reading </Link>

  </div>
</div>

  );
}
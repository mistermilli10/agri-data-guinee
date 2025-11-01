import Link from 'next/link';
import { Facebook, Linkedin, Mail } from 'lucide-react';

const footerNav = [
  {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Accueil' },
      { href: '/filieres', label: 'Filières' },
      { href: '/acteurs', label: 'Acteurs' },
      { href: '/projets', label: 'Projets' }
    ]
  },
  {
    title: 'Ressources',
    links: [
      { href: '#', label: 'Documentation' },
      { href: '#', label: 'Rapports' },
      { href: '#', label: 'Politiques publiques' }
    ]
  }
];

export const Footer = () => (
  <footer className="mt-24 bg-gray-ui py-14 text-sm text-gray-600">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-green">
          AgriData Guinée
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed">
          Accélérez la transformation digitale du secteur agricole grâce à des
          données fiables, des analyses en temps réel et un réseau d'acteurs
          engagés.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="mailto:contact@agridata.gov.gn"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green shadow"
          >
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green shadow"
          >
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green shadow"
          >
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
      {footerNav.map((section) => (
        <div key={section.title}>
          <h4 className="text-base font-semibold text-gray-800">
            {section.title}
          </h4>
          <ul className="mt-4 space-y-2">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h4 className="text-base font-semibold text-gray-800">
          Contact MAGEL
        </h4>
        <p className="mt-4 leading-relaxed">
          Quartier administratif, Conakry, République de Guinée
          <br />
          Tél : +224 600 00 00 00
          <br />
          Email : contact@agridata.gov.gn
        </p>
      </div>
    </div>
    <div className="mt-10 border-t border-gray-border pt-6 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} MAGEL. Tous droits réservés.
    </div>
  </footer>
);

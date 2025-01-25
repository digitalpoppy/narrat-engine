import { createRequire } from 'module';
import type { LocaleSpecificConfig, DefaultTheme } from 'vitepress';

export const configFr: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: 'fr-FR',
  title: 'Documentation de Narrat',
  description: 'Créez des jeux narratifs et visual novels pour web et desktop',
  link: '/fr/',
  label: 'Français',
  themeConfig: {
    siteTitle: 'Documentation de Narrat',
    footer: {
      message: 'License MIT',
      copyright: 'Créé par Liana P',
    },
    sidebar: [
      {
        text: 'Autres langues',
        items: [
          { text: 'English', link: '/guides/getting-started' },
          { text: '日本語', link: '/jp/guides/getting-started' },
          { text: '简体中文', link: '/zh/guides/getting-started' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Commencer', link: '/fr/guides/getting-started' },
          {
            text: `Vue d'ensemble d'un jeu Narrat`,
            link: '/fr/guides/narrat-overview',
          },
          {
            text: 'Modifier son jeu',
            link: '/fr/guides/editing-game',
          },
          {
            text: 'Modifier la config',
            link: '/fr/guides/config-files',
          },
          {
            text: 'Personnaliser son interface',
            link: '/fr/guides/customising-ui',
          },
          {
            text: 'Thèmes',
            link: '/fr/guides/themes',
          },
          {
            text: `Utiliser des polices d'écriture personnalisées`,
            link: `/fr/guides/using-custom-fonts`,
          },
          {
            text: `Build et export`,
            link: `/guides/building-and-exporting`,
          },
          {
            text: `Obtenir de l'aide`,
            link: `fr/guides/getting-help`,
          },
          {
            text: `Publier sur steam`,
            link: `/guides/steam-publishing`,
          },
          {
            text: 'Mettre Narrat à jour',
            link: '/fr/guides/updating-narrat',
          },
          {
            text: 'Boutons de menu personnalisés',
            link: '/fr/guides/custom-start-buttons',
          },
          {
            text: 'Reste des docs (en anglais)',
            link: '/guides/getting-started',
          },
        ],
      },
    ],
    nav: [
      { text: 'Playground', link: 'https://demo.narrat.dev' },
      { text: 'Dépannage', link: '/troubleshooting/troubleshooting' },
      { text: 'FAQ', link: '/others/faq' },
      { text: 'Commencer', link: '/fr/guides/getting-started' },
      {
        text: 'Script',
        items: [
          {
            link: '/commands/all-commands',
            text: 'Référence de tous les commandes',
          },
          {
            text: 'Exemple de script',
            link: '/examples/example-narrat-script',
          },
          {
            text: 'Syntaxe du langage narrat',
            link: '/scripting/language-syntax',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          {
            text: 'Exemple de configuration',
            link: '/examples/example-config',
          },
          { text: 'Édition de la configuration', link: '/guides/config-files' },
          {
            text: 'Toutes les configurations',
            link: '/config/all-config-files',
          },
        ],
      },
    ],
    search: {
      options: {
        locales: {
          fr: {
            translations: {
              button: {
                buttonText: 'Recherche',
                buttonAriaLabel: 'Recherche',
              },
              modal: {
                displayDetails: 'Afficher les détails',
                resetButtonTitle: 'Réinitialiser',
                backButtonTitle: 'Retour',
                noResultsText: 'Pas de résultat pour',
                footer: {
                  selectText: 'pour sélectionner',
                  selectKeyAriaLabel: 'sélection',
                  navigateText: 'pour naviguer',
                  navigateUpKeyAriaLabel: 'haut',
                  navigateDownKeyAriaLabel: 'bas',
                  closeText: 'Fermer',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
  },
};

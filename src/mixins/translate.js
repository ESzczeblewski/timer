import languages from '../languages';

export default {

  methods: {

    app__text(view, sentence){

      const lang = this.$store.state.language;
      if (!languages[lang]) return sentence;

      if (view){

        if (languages[lang].translations[view]){

          const translation = languages[lang].translations[view].find((o) => o[0].toLowerCase() === sentence.toLowerCase());
          if (translation) return translation[1];

        }

      }

      return sentence;

    }

  },

};

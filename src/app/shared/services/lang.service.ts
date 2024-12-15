import { inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import ar from '../../../public/i18n/ar.json';
import en from '../../../public/i18n/en.json';

@Injectable(
    {providedIn: "root"}
)

export class LangService {
    translate = inject(TranslateService);

    initLocalization() {
        this.translate.addLangs(['ar', 'en']);
        this.translate.setDefaultLang('en');
        this.translate.setTranslation('ar', ar);
        this.translate.setTranslation('en', en);
        this.translate.use('en');
    }

    changeLang() {
        this.translate.use(this.translate.currentLang === 'en' ? 'ar' : 'en');
    }

}
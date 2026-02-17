export const stages = [
  {
    stage_id: "toshiba_2006",
    tag: null,
    company_name: "東芝",
    category: "買収",
    stage_name: "東芝 (原発買収の激震)",
    investment_target: "米ウエスチングハウス買収",
    before_year: 2006,
    after_year: 2017,
    unit: "1,000億円",
    description:
      "2006年、東芝は原子力事業の拡大を狙い、米ウエスチングハウス(WH)を約6,600億円で買収。しかし福島原発事故後、原子力事業は世界的に縮小し、巨額の減損損失が発生。債務超過に陥った。",
    data: {
      before: {
        assets: { cash: 2.5, goodwill: 0.0, others: 42.5 },
        liabilities: { debt: 11.0, others: 24.0 },
        equity: 10.0,
      },
      deal: {
        assets: { cash: 1.9, goodwill: 6.6, others: 42.5 },
        liabilities: { debt: 17.0, others: 24.0 },
        equity: 10.0,
      },
      investment: { amount: 6.6, method: "debt_financed" },
      after_actual: {
        assets: { cash: 1.0, goodwill: 0.0, others: 27.4 },
        liabilities: { debt: 22.0, others: 11.9 },
        equity: -5.5,
      },
      stockPrice: {
        before: 750,
        deal: 780,
        after: 220,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2006, headline: "東芝、米原発大手WHを6600億円で買収", isBreaking: true },
        { year: 2011, headline: "福島原発事故発生。世界の原子力政策が転換", isBreaking: false },
        { year: 2015, headline: "東芝、不正会計が発覚。利益水増し7年間", isBreaking: false },
        { year: 2016, type: "official", headline: "過年度決算の訂正が発覚。利益水増し1,562億円", isCritical: true },
        { year: 2017, type: "audit_warning", subtype: "going_concern", headline: "有価証券報告書に『継続企業の前提に関する重要な疑義』が注記される", severity: "high", isCritical: true },
        { year: 2017, type: "financial", headline: "メインバンク：融資維持の条件として半導体事業の売却を要求" },
        { year: 2017, headline: "東芝、債務超過で上場廃止の瀬戸際", isBreaking: true },
      ],
      summary: { totalImpairment: 14.5 },
    },
  },
  {
    stage_id: "sharp_2009",
    tag: null,
    company_name: "シャープ",
    category: "設備投資",
    stage_name: "シャープ (液晶投資の光と影)",
    investment_target: "堺液晶工場建設",
    before_year: 2009,
    after_year: 2016,
    unit: "1,000億円",
    description:
      "2009年、シャープは液晶パネルの世界的リーダーを目指し、堺工場に約3,800億円を投じた。しかしスマートフォン向け有機ELの台頭や価格競争の激化により、液晶事業は急速に悪化。最終的に債務超過に陥り、2016年に鴻海(ホンハイ)精密工業の傘下に入った。",
    data: {
      before: {
        assets: { cash: 4.5, goodwill: 0.0, others: 23.5 },
        liabilities: { debt: 6.5, others: 11.5 },
        equity: 10.0,
      },
      deal: {
        assets: { cash: 1.2, goodwill: 0.0, others: 26.8 },
        liabilities: { debt: 6.5, others: 11.5 },
        equity: 10.0,
      },
      investment: { amount: 3.3, method: "cash_to_capex" },
      after_actual: {
        assets: { cash: 0.7, goodwill: 0.0, others: 10.5 },
        liabilities: { debt: 8.8, others: 5.5 },
        equity: -3.1,
      },
      stockPrice: {
        before: 1100,
        deal: 950,
        after: 130,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2009, headline: "シャープ、堺に世界最大の液晶工場建設", isBreaking: true },
        { year: 2012, headline: "液晶パネル価格崩落。シャープ、過去最大の赤字", isBreaking: false },
        { year: 2013, type: "official", headline: "有価証券報告書に継続企業の前提に関する重要な疑義が記載される", isCritical: true },
        { year: 2015, type: "audit_warning", subtype: "going_concern", headline: "『継続企業の前提に関する重要な疑義』が2期連続で注記される", severity: "high", isCritical: true },
        { year: 2015, type: "financial", headline: "メインバンク：追加融資の条件として大規模リストラを要求" },
        { year: 2016, headline: "シャープ、鴻海傘下に。日本の液晶神話が終焉", isBreaking: true },
      ],
      summary: { totalImpairment: 11.0 },
    },
  },
  {
    stage_id: "google_2006",
    tag: null,
    company_name: "Google",
    category: "買収",
    stage_name: "Google (YouTube買収の伝説)",
    investment_target: "YouTube買収",
    before_year: 2006,
    after_year: 2016,
    unit: "1,000億円",
    description:
      "2006年、GoogleはYouTubeを約16.5億ドル(約2,000億円)で買収。動画プラットフォームという未知の領域への投資は当時「高すぎる」と批判された。しかしYouTubeは世界最大の動画プラットフォームとなり、Googleの広告収益を劇的に押し上げた。",
    data: {
      before: {
        assets: { cash: 11.0, goodwill: 0.0, others: 7.4 },
        liabilities: { debt: 0.0, others: 1.4 },
        equity: 17.0,
      },
      deal: {
        assets: { cash: 9.0, goodwill: 2.0, others: 7.4 },
        liabilities: { debt: 0.0, others: 1.4 },
        equity: 17.0,
      },
      investment: { amount: 2.0, method: "cash_financed" },
      after_actual: {
        assets: { cash: 95.0, goodwill: 2.0, others: 60.0 },
        liabilities: { debt: 0.0, others: 22.0 },
        equity: 135.0,
      },
      stockPrice: {
        before: 210,
        deal: 230,
        after: 800,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2006, headline: "Google、動画サイトYouTubeを16.5億ドルで買収", isBreaking: true },
        { year: 2010, headline: "YouTube月間視聴20億回突破。動画広告市場が急拡大", isBreaking: false },
        { year: 2016, headline: "YouTube広告収入1兆円超。Googleの成長エンジンに", isBreaking: true },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  {
    stage_id: "tesla_2014",
    tag: null,
    company_name: "Tesla",
    category: "設備投資",
    stage_name: "Tesla (ギガファクトリーの賭け)",
    investment_target: "ギガファクトリー建設",
    before_year: 2014,
    after_year: 2024,
    unit: "1,000億円",
    description:
      "2014年、TeslaはネバダにギガファクトリーをEVバッテリーの大量生産を目的に建設開始。約50億ドルの投資は、当時年間売上わずか31億ドルの企業にとって巨大な賭けだった。しかしEVの急速な普及とバッテリーコスト低減により、Teslaは世界最大のEVメーカーへと成長した。",
    data: {
      before: {
        assets: { cash: 2.4, goodwill: 0.0, others: 3.4 },
        liabilities: { debt: 2.5, others: 2.3 },
        equity: 1.0,
      },
      deal: {
        assets: { cash: 1.0, goodwill: 0.0, others: 4.8 },
        liabilities: { debt: 2.5, others: 2.3 },
        equity: 1.0,
      },
      investment: { amount: 1.4, method: "cash_to_capex" },
      after_actual: {
        assets: { cash: 45.0, goodwill: 0.0, others: 70.0 },
        liabilities: { debt: 10.0, others: 35.0 },
        equity: 70.0,
      },
      stockPrice: {
        before: 15,
        deal: 14,
        after: 200,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2014, headline: "Tesla、ネバダにギガファクトリー建設を発表", isBreaking: true },
        { year: 2017, headline: "Model 3発表、予約40万台突破。量産化に苦戦", isBreaking: false },
        { year: 2020, headline: "Tesla株、年初来8倍。時価総額がトヨタを超える", isBreaking: false },
        { year: 2024, headline: "Tesla、世界EV販売トップを維持。年間180万台", isBreaking: true },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  // ── パナソニック ──
  {
    stage_id: "panasonic_2009",
    tag: null,
    company_name: "パナソニック",
    category: "買収",
    stage_name: "パナソニック (聖域なき減損)",
    investment_target: "三洋電機買収",
    before_year: 2009,
    after_year: 2014,
    unit: "1,000億円",
    description:
      "2009年、パナソニックは三洋電機を子会社化。電池事業の成長を期待し、約5,200億円ののれんを計上した。しかし直後にプラズマTV事業の撤退と三洋関連資産の減損が重なり、2期連続で7,000億円超の赤字に転落。無配転落という創業以来の危機に見舞われた。",
    data: {
      before: {
        assets: { cash: 9.7, goodwill: 0.0, others: 44.3 },
        liabilities: { debt: 9.1, others: 26.5 },
        equity: 18.4,
      },
      deal: {
        assets: { cash: 12.0, goodwill: 5.2, others: 56.5 },
        liabilities: { debt: 22.0, others: 31.0 },
        equity: 20.7,
      },
      investment: { amount: 5.2, method: "debt_financed" },
      after_actual: {
        assets: { cash: 5.9, goodwill: 0.1, others: 48.0 },
        liabilities: { debt: 20.5, others: 21.0 },
        equity: 12.5,
      },
      stockPrice: {
        before: 1500,
        deal: 1200,
        after: 600,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2010, type: "official", headline: "パナソニック、三洋電機を子会社化。電池事業を核に成長へ" },
        { year: 2012, type: "audit", headline: "プラズマTV撤退と三洋関連資産の減損で2年連続7,000億超の赤字", isCritical: true },
        { year: 2013, type: "official", headline: "無配転落：創業以来の危機。金融機関が劣後ローンによる資本支援", isCritical: true },
      ],
      summary: { totalImpairment: 15.0 },
    },
  },
  // ── 楽天グループ ──
  {
    stage_id: "rakuten_2019",
    tag: null,
    company_name: "楽天グループ",
    category: "事業進出",
    stage_name: "楽天グループ (モバイルへの巨額投資)",
    investment_target: "モバイル事業参入",
    before_year: 2019,
    after_year: 2025,
    unit: "1,000億円",
    description:
      "2019年、楽天グループは第4のキャリアとしてモバイル事業に参入。基地局建設に巨額の投資を行い、有利子負債が急増。楽天経済圏の強みを活かしつつも、モバイル事業の赤字が財務を圧迫し、子会社売却やGC注記の検討に追い込まれた。",
    data: {
      before: {
        assets: { cash: 11.5, goodwill: 8.0, others: 71.5 },
        liabilities: { debt: 16.0, others: 66.5 },
        equity: 8.5,
      },
      deal: {
        assets: { cash: 15.0, goodwill: 8.5, others: 105.0 },
        liabilities: { debt: 35.0, others: 84.0 },
        equity: 9.5,
      },
      investment: { amount: 33.5, method: "debt_financed" },
      after_actual: {
        assets: { cash: 46.0, goodwill: 7.0, others: 162.0 },
        liabilities: { debt: 102.0, others: 105.0 },
        equity: 8.0,
      },
      stockPrice: {
        before: 1100,
        deal: 950,
        after: 750,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2021, type: "financial", headline: "有利子負債が10兆円突破（銀行合算）。モバイル基地局投資が重荷に" },
        { year: 2023, type: "official", subtype: "going_concern", headline: "継続企業の前提に関する重要な疑義注記（GC注記）を検討。楽天証券など子会社売却へ", isCritical: true },
        { year: 2024, type: "financial", headline: "ドル建て社債の借り換えを完了。金融機関とのコベナンツ調整が続く", isCritical: true },
      ],
      summary: { totalImpairment: 5.5 },
    },
  },
  // ── AOLタイム・ワーナー ──
  {
    stage_id: "aol_2000",
    tag: null,
    company_name: "AOL",
    category: "買収",
    stage_name: "AOLタイム・ワーナー (史上最大の減損)",
    investment_target: "タイム・ワーナーとの合併",
    before_year: 2000,
    after_year: 2004,
    unit: "10億ドル",
    description:
      "2000年、ITバブルの頂点で新興のAOLが名門タイム・ワーナーを飲み込む形で合併。時価総額3,500億ドルの巨大メディアが誕生したが、ドットコムバブル崩壊後に旧AOL資産の価値が消失。990億ドル（約12兆円）という史上最大の減損を計上した。",
    data: {
      before: {
        assets: { cash: 1.5, goodwill: 0.0, others: 18.5 },
        liabilities: { debt: 1.0, others: 9.0 },
        equity: 10.0,
      },
      deal: {
        assets: { cash: 3.0, goodwill: 127.0, others: 70.0 },
        liabilities: { debt: 25.0, others: 15.0 },
        equity: 160.0,
      },
      investment: { amount: 127.0, method: "stock_financed" },
      after_actual: {
        assets: { cash: 2.5, goodwill: 28.0, others: 65.0 },
        liabilities: { debt: 28.0, others: 14.5 },
        equity: 53.0,
      },
      stockPrice: {
        before: 70,
        deal: 45,
        after: 15,
        unit: "$",
        curve: "crash_early",
      },
      news: [
        { year: 2001, type: "official", headline: "AOLとタイム・ワーナー合併。時価総額3500億ドルの巨大メディア誕生" },
        { year: 2002, type: "audit", headline: "米会計基準変更。旧AOLの価値消失を認め、990億ドル（約12兆円）の巨額減損", isCritical: true },
        { year: 2003, type: "official", headline: "社名から『AOL』が消滅。合併は実質的な失敗と市場が判断", isCritical: true },
      ],
      summary: { totalImpairment: 120.0 },
    },
  },
  // ── ソフトバンクグループ ──
  {
    stage_id: "softbank_2019",
    tag: null,
    company_name: "ソフトバンクG",
    category: "投資",
    stage_name: "ソフトバンクグループ (投資の光と影)",
    investment_target: "ビジョンファンド投資",
    before_year: 2019,
    after_year: 2024,
    unit: "1,000億円",
    description:
      "ソフトバンクグループは世界最大の投資会社へと変貌。ビジョンファンドを通じて未上場企業に巨額投資を行ったが、WeWork上場撤回やハイテク株安で巨額損失を計上。一方、英Arm上場など反転の芽も見せた。",
    data: {
      before: {
        assets: { cash: 38.0, goodwill: 42.0, others: 300.0 },
        liabilities: { debt: 160.0, others: 130.0 },
        equity: 90.0,
      },
      deal: {
        assets: { cash: 35.0, goodwill: 45.0, others: 320.0 },
        liabilities: { debt: 180.0, others: 130.0 },
        equity: 90.0,
      },
      investment: { amount: 45.0, method: "mixed" },
      after_actual: {
        assets: { cash: 60.0, goodwill: 10.0, others: 350.0 },
        liabilities: { debt: 200.0, others: 110.0 },
        equity: 110.0,
      },
      stockPrice: {
        before: 5000,
        deal: 4500,
        after: 6500,
        unit: "円",
      },
      news: [
        { year: 2020, type: "official", headline: "WeWork上場撤回。ソフトバンクG、1兆円規模の追加支援と減損を迫られる", isCritical: true },
        { year: 2022, type: "official", headline: "ビジョンファンド、ハイテク株安で5兆円超の巨額損失。守りの経営へ", isCritical: true },
        { year: 2023, type: "financial", headline: "英Arm上場で現金確保。LTV（保有資産負債比率）を死守し財務健全性を強調" },
      ],
      summary: { totalImpairment: 35.0 },
    },
  },
  // ── ソニー ──
  {
    stage_id: "sony_2012",
    tag: "復活",
    company_name: "ソニー",
    category: "構造改革",
    stage_name: "ソニー (復活の構造改革)",
    investment_target: "構造改革・エンタメ転換",
    before_year: 2012,
    after_year: 2023,
    unit: "1,000億円",
    description:
      "2012年、ソニーは「ソニーショック」と呼ばれる過去最大の赤字を計上。平井新体制で構造改革を断行し、エレクトロニクスをスリム化。音楽・ゲーム・金融で稼ぐ高収益体質へ転換し、純利益1兆円企業へと変貌を遂げた。",
    data: {
      before: {
        assets: { cash: 7.0, goodwill: 5.0, others: 120.0 },
        liabilities: { debt: 13.0, others: 99.0 },
        equity: 20.0,
      },
      deal: {
        assets: { cash: 10.0, goodwill: 6.0, others: 130.0 },
        liabilities: { debt: 15.0, others: 110.0 },
        equity: 21.0,
      },
      investment: { amount: 6.0, method: "mixed" },
      after_actual: {
        assets: { cash: 15.0, goodwill: 25.0, others: 280.0 },
        liabilities: { debt: 25.0, others: 225.0 },
        equity: 70.0,
      },
      stockPrice: {
        before: 900,
        deal: 1500,
        after: 12500,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2013, type: "official", headline: "過去最大の赤字4500億円。平井新体制で『One Sony』掲げ構造改革へ", isCritical: true },
        { year: 2015, type: "audit", headline: "継続企業の前提（GC）注記の懸念から脱却。黒字化が定着" },
        { year: 2021, type: "official", headline: "純利益1兆円突破。ハードからコンテンツと金融の融合B/Sへ完全転換" },
      ],
      summary: { totalImpairment: 8.0 },
    },
  },
  // ── Apple ──
  {
    stage_id: "apple_2015",
    tag: "筋肉質",
    company_name: "Apple",
    category: "資本政策",
    stage_name: "Apple (資本効率の極致)",
    investment_target: "自社株買い・資本戦略",
    before_year: 2015,
    after_year: 2024,
    unit: "10億ドル",
    description:
      "Appleは圧倒的なキャッシュを稼ぎながら、あえて社債を発行。その資金で大規模な自社株買いを行い、純資産を圧縮してROEを極限まで高める。「現金の王様」による高度な財務戦略で時価総額3兆ドルを達成した。",
    data: {
      before: {
        assets: { cash: 20.0, goodwill: 0.0, others: 10.0 },
        liabilities: { debt: 6.0, others: 12.0 },
        equity: 12.0,
      },
      deal: {
        assets: { cash: 25.0, goodwill: 0.0, others: 12.0 },
        liabilities: { debt: 11.0, others: 15.0 },
        equity: 11.0,
      },
      investment: { amount: 0, method: "buyback" },
      after_actual: {
        assets: { cash: 16.0, goodwill: 0.0, others: 19.0 },
        liabilities: { debt: 11.0, others: 18.0 },
        equity: 6.0,
      },
      stockPrice: {
        before: 30,
        deal: 50,
        after: 190,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2016, type: "financial", headline: "巨額の現金を持ちながら社債発行。超低金利を活かしたレバレッジ経営" },
        { year: 2018, type: "official", headline: "『ネット・キャッシュ・ニュートラル』目標を発表。現金を株主還元へ集中" },
        { year: 2023, type: "official", headline: "時価総額3兆ドル突破。自社株買いにより純資産が極めて薄い筋肉質なB/Sへ" },
      ],
      summary: { totalImpairment: 0.0 },
    },
  },
  // ── JAL① ──
  {
    stage_id: "jal_part1",
    tag: null,
    company_name: "日本航空",
    category: "設備投資",
    stage_name: "JAL① (放漫経営と墜落)",
    investment_target: "JAS統合・事業拡大",
    before_year: 1990,
    after_year: 2010,
    unit: "1,000億円",
    description:
      "バブル期の過剰投資とJAS統合で肥大化したB/S。ジャンボ機の維持費と年金債務がのしかかり、燃油高騰・SARS・テロの直撃で経営は窒息。2010年、負債総額2兆3,221億円で会社更生法を申請し、株価は1円に。戦後最大の事業破綻となった。",
    data: {
      before: {
        assets: { cash: 3.5, goodwill: 0.0, others: 10.0 },
        liabilities: { debt: 6.0, others: 4.5 },
        equity: 3.0,
      },
      deal: {
        assets: { cash: 3.0, goodwill: 0.5, others: 20.0 },
        liabilities: { debt: 13.0, others: 8.5 },
        equity: 2.0,
      },
      investment: { amount: 10.0, method: "debt_financed" },
      after_actual: {
        assets: { cash: 0.5, goodwill: 0.0, others: 14.5 },
        liabilities: { debt: 9.0, others: 18.0 },
        equity: -12.0,
      },
      stockPrice: {
        before: 1200,
        deal: 300,
        after: 1,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2002, headline: "日本航空と日本エアシステムが統合。世界3位のメガキャリア誕生", isBreaking: true },
        { year: 2005, headline: "燃油高騰とSARS・テロが直撃。人件費と年金債務が重く、公的資金注入を模索" },
        { year: 2010, type: "audit", subtype: "going_concern", headline: "会社更生法適用を申請。負債総額2兆3,221億円、戦後最大の事業破綻", isCritical: true },
      ],
      summary: { totalImpairment: 12.0 },
    },
  },
  // ── JAL② ──
  {
    stage_id: "jal_part2",
    tag: "復活",
    company_name: "日本航空",
    category: "構造改革",
    stage_name: "JAL② (稲盛和夫の再生)",
    investment_target: "債権放棄・アメーバ経営",
    before_year: 2010,
    after_year: 2012,
    unit: "1,000億円",
    description:
      "債権放棄と不採算路線の撤退、そして稲盛和夫氏が導入した「アメーバ経営」による意識改革で、わずか2年で高収益企業へ脱皮。奇跡の再上場を果たした。",
    data: {
      before: {
        assets: { cash: 0.5, goodwill: 0.0, others: 14.5 },
        liabilities: { debt: 9.0, others: 18.0 },
        equity: -12.0,
      },
      deal: {
        assets: { cash: 4.0, goodwill: 0.0, others: 10.0 },
        liabilities: { debt: 1.0, others: 5.0 },
        equity: 8.0,
      },
      investment: { amount: 3.5, method: "restructuring" },
      after_actual: {
        assets: { cash: 4.5, goodwill: 0.0, others: 10.5 },
        liabilities: { debt: 1.5, others: 5.0 },
        equity: 8.5,
      },
      stockPrice: {
        before: 1,
        deal: 1,
        after: 3800,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2010, headline: "稲盛和夫氏、会長に就任。無報酬で再建を指揮。京セラ流「アメーバ経営」導入", isBreaking: true },
        { year: 2011, headline: "大型機の売却と人員削減を断行。全社員が採算意識を持つ集団へ変貌" },
        { year: 2012, headline: "JAL、奇跡の再上場。営業利益率世界トップクラスへ。更生手続き終結", isBreaking: true },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  // ── 日産自動車 ──
  {
    stage_id: "nissan_1999",
    tag: "復活",
    company_name: "日産自動車",
    category: "構造改革",
    stage_name: "日産自動車 (リバイバル・プラン)",
    investment_target: "ルノー資本提携",
    before_year: 1998,
    after_year: 2004,
    unit: "1,000億円",
    description:
      "有利子負債2兆円、倒産目前の「不沈戦艦」日産自動車。1999年にルノーとの資本提携で現金を確保し、カルロス・ゴーン氏のもと『日産リバイバル・プラン』を断行。聖域なきリストラで有利子負債ゼロを達成したV字回復の伝説。",
    data: {
      before: {
        assets: { cash: 4.0, goodwill: 0.0, others: 56.0 },
        liabilities: { debt: 21.0, others: 34.0 },
        equity: 5.0,
      },
      deal: {
        assets: { cash: 10.0, goodwill: 0.0, others: 50.0 },
        liabilities: { debt: 21.0, others: 34.0 },
        equity: 5.0,
      },
      investment: { amount: 6.4, method: "equity_financed" },
      after_actual: {
        assets: { cash: 3.0, goodwill: 0.0, others: 47.0 },
        liabilities: { debt: 3.0, others: 27.0 },
        equity: 20.0,
      },
      stockPrice: {
        before: 450,
        deal: 400,
        after: 1200,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 1999, type: "financial", headline: "ルノーが6430億円を出資。資本提携により現金を確保" },
        { year: 2000, type: "official", headline: "『日産リバイバル・プラン』始動。村山工場閉鎖などの聖域なきリストラ", isCritical: true },
        { year: 2003, type: "official", headline: "有利子負債をゼロ（自動車部門）にする『コミットメント』達成。V字回復" },
      ],
      summary: { totalImpairment: 6.0 },
    },
  },
  // ── オリンパス① ──
  {
    stage_id: "olympus_part1",
    tag: null,
    company_name: "オリンパス",
    category: "利益操作",
    stage_name: "オリンパス① (巨額損失隠しの破綻)",
    investment_target: "不透明なM&A買収",
    before_year: 2000,
    after_year: 2011,
    unit: "1,000億円",
    description:
      "バブル期の「飛ばし」による損失を、不透明なM&Aの「のれん」で覆い隠そうとしたフェーズ。2008年に英ジャイラス社買収で1,900億円ののれんを計上したが、2011年にウッドフォード社長の告発で1,177億円の損失隠しが露呈。純資産はゼロに毀損し、東証から「特設注意市場銘柄」に指定された。",
    data: {
      before: {
        assets: { cash: 1.8, goodwill: 0.0, others: 3.5 },
        liabilities: { debt: 1.5, others: 2.2 },
        equity: 1.6,
      },
      deal: {
        assets: { cash: 1.6, goodwill: 1.9, others: 7.5 },
        liabilities: { debt: 6.5, others: 2.5 },
        equity: 2.0,
      },
      investment: { amount: 1.9, method: "off_balance" },
      after_actual: {
        assets: { cash: 1.9, goodwill: 0.2, others: 7.5 },
        liabilities: { debt: 6.5, others: 3.1 },
        equity: 0.0,
      },
      stockPrice: {
        before: 2500,
        deal: 2500,
        after: 500,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2000, headline: "財テク失敗の含み損を特別目的会社に移管。「飛ばし」スキーム始動", isBreaking: true },
        { year: 2008, headline: "英ジャイラス社買収で不透明な660億円のアドバイザリー費用が発生" },
        { year: 2011, type: "audit", headline: "ウッドフォード社長が不正を告発。1,177億円の損失隠しが発覚", isCritical: true },
        { year: 2011, type: "official", headline: "東証が「特設注意市場銘柄」に指定。上場廃止の瀬戸際に", isCritical: true },
      ],
      summary: { totalImpairment: 1.2 },
    },
  },
  // ── オリンパス② ──
  {
    stage_id: "olympus_part2",
    tag: null,
    company_name: "オリンパス",
    category: "構造改革",
    stage_name: "オリンパス② (ソニー提携と外科の王道)",
    investment_target: "ソニー資本提携",
    before_year: 2012,
    after_year: 2015,
    unit: "1,000億円",
    description:
      "崩壊したB/Sをソニーからの500億円の出資で立て直し、内視鏡事業の圧倒的シェアを武器に復活するフェーズ。特設注意市場銘柄の指定解除を勝ち取り、内視鏡世界シェア7割を誇る医療機器メーカーとして完全復活を遂げた。",
    data: {
      before: {
        assets: { cash: 1.6, goodwill: 0.2, others: 7.6 },
        liabilities: { debt: 6.5, others: 2.9 },
        equity: 0.0,
      },
      deal: {
        assets: { cash: 2.1, goodwill: 0.2, others: 7.6 },
        liabilities: { debt: 6.5, others: 2.9 },
        equity: 0.5,
      },
      investment: { amount: 0.5, method: "equity_financed" },
      after_actual: {
        assets: { cash: 2.5, goodwill: 0.5, others: 8.5 },
        liabilities: { debt: 4.0, others: 3.5 },
        equity: 4.0,
      },
      stockPrice: {
        before: 500,
        deal: 1200,
        after: 4000,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2012, type: "official", headline: "ソニーが500億円を出資。医療機器事業の技術提携を締結", isBreaking: true },
        { year: 2013, type: "official", headline: "特設注意市場銘柄の指定解除。内部管理体制の改善が認められる" },
        { year: 2015, headline: "内視鏡世界シェア7割。医療機器メーカーとして完全復活", isBreaking: true },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  // ── リーマン・ブラザーズ ──
  {
    stage_id: "lehman_2008",
    tag: "崩壊",
    company_name: "リーマン",
    category: "投資",
    stage_name: "リーマン・ブラザーズ (投資銀行の終焉)",
    investment_target: "サブプライム関連投資",
    before_year: 2006,
    after_year: 2009,
    unit: "10億ドル",
    description:
      "レバレッジ30倍超で膨張したB/Sが、サブプライム危機で一瞬にして崩壊。2008年9月、FRBの救済を得られず米史上最大のチャプター11を申請。資産は紙屑となり、全世界に金融恐慌が波及した。",
    data: {
      before: {
        assets: { cash: 1.5, goodwill: 0.0, others: 62.5 },
        liabilities: { debt: 61.5, others: 0.0 },
        equity: 2.5,
      },
      deal: {
        assets: { cash: 0.5, goodwill: 0.0, others: 60.0 },
        liabilities: { debt: 58.5, others: 0.0 },
        equity: 2.0,
      },
      investment: { amount: 60.0, method: "leverage" },
      after_actual: {
        assets: { cash: 0.0, goodwill: 0.0, others: 0.0 },
        liabilities: { debt: 60.0, others: 0.0 },
        equity: -60.0,
      },
      stockPrice: {
        before: 80,
        deal: 20,
        after: 0,
        unit: "$",
        curve: "crash_early",
      },
      news: [
        { year: 2007, type: "financial", headline: "サブプライム関連資産の暴落。レバレッジ30倍超のB/Sが限界に", isCritical: true },
        { year: 2008, type: "official", subtype: "going_concern", headline: "FRBによる救済を断念。米史上最大のチャプター11申請へ", isCritical: true },
        { year: 2008, type: "audit", headline: "資産価値は事実上のゼロ。全世界に金融恐慌が波及", isCritical: true },
      ],
      summary: { totalImpairment: 60.0 },
    },
  },
  // ── ダイエー ──
  {
    stage_id: "daiei_2002",
    tag: null,
    company_name: "ダイエー",
    category: "設備投資",
    stage_name: "ダイエー (土地神話の崩壊)",
    investment_target: "店舗拡大・不動産投資",
    before_year: 1995,
    after_year: 2006,
    unit: "1,000億円",
    description:
      "「価格破壊」を旗印に店舗を拡大し続けたダイエー。土地神話の崩壊とデフレにより、不動産担保で膨らんだ有利子負債2兆4,000億円が重荷に。5,200億円の債権放棄と産業再生機構の支援を経て、創業者中内功氏の時代が終焉した。",
    data: {
      before: {
        assets: { cash: 2.0, goodwill: 0.0, others: 28.0 },
        liabilities: { debt: 24.0, others: 4.0 },
        equity: 2.0,
      },
      deal: {
        assets: { cash: 1.0, goodwill: 0.0, others: 19.0 },
        liabilities: { debt: 25.0, others: 5.0 },
        equity: -10.0,
      },
      investment: { amount: 0, method: "debt_financed" },
      after_actual: {
        assets: { cash: 1.5, goodwill: 0.0, others: 10.0 },
        liabilities: { debt: 4.0, others: 3.5 },
        equity: 4.0,
      },
      stockPrice: {
        before: 1200,
        deal: 150,
        after: 50,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2002, type: "financial", headline: "主力3行、5200億円の債権放棄を伴う再建支援を決定", isCritical: true },
        { year: 2004, type: "official", headline: "産業再生機構への支援を要請。創業者中内功氏の時代が終焉", isCritical: true },
        { year: 2005, type: "audit", headline: "店舗網を大幅縮小。有利子負債を売却益で返済する決死のB/Sスリム化" },
      ],
      summary: { totalImpairment: 12.0 },
    },
  },
  // ── スターバックス ──
  {
    stage_id: "starbucks_2019",
    tag: null,
    company_name: "スターバックス",
    category: "資本政策",
    stage_name: "スターバックス (あえての債務超過)",
    investment_target: "自社株買い戦略",
    before_year: 2018,
    after_year: 2024,
    unit: "10億ドル",
    description:
      "債務超過なのに倒産しない、超優良企業の「自社株買い」特化型B/S。稼いだ現金を全て株主還元へ投入し、会計上の純資産がマイナスに。それでも圧倒的なブランド力と稼ぐ力で、決算は適正と判断される異色の事例。",
    data: {
      before: {
        assets: { cash: 2.5, goodwill: 0.0, others: 22.5 },
        liabilities: { debt: 9.5, others: 14.0 },
        equity: 1.5,
      },
      deal: {
        assets: { cash: 3.0, goodwill: 0.0, others: 26.0 },
        liabilities: { debt: 16.0, others: 21.0 },
        equity: -8.0,
      },
      investment: { amount: 0, method: "buyback" },
      after_actual: {
        assets: { cash: 4.0, goodwill: 0.0, others: 25.0 },
        liabilities: { debt: 25.0, others: 12.0 },
        equity: -8.0,
      },
      stockPrice: {
        before: 60,
        deal: 80,
        after: 95,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2019, type: "financial", headline: "稼いだ現金を全て自社株買いへ投入。会計上の純資産がマイナスに" },
        { year: 2020, type: "official", headline: "パンデミックで売上減も、ブランド力で低金利社債を発行。現金を維持" },
        { year: 2023, type: "audit", headline: "マイナスの純資産でも圧倒的なキャッシュフローで無借金経営を継続" },
      ],
      summary: { totalImpairment: 0.0 },
    },
  },
  // ── エンロン ──
  {
    stage_id: "enron_2001",
    tag: "崩壊",
    company_name: "エンロン",
    category: "利益操作",
    stage_name: "エンロン (消された負債の逆襲)",
    investment_target: "簿外取引・SPEスキーム",
    before_year: 2000,
    after_year: 2002,
    unit: "10億ドル",
    description:
      "B/Sに載っていない負債（簿外）が、名門企業を一夜で破滅させた事例。数百の特別目的会社(SPE)へ負債を飛ばし、会計事務所アーサー・アンダーセンも隠蔽に協力。米史上最大（当時）の経営破綻となり、B/Sへの信頼性を根本から揺るがした。",
    data: {
      before: {
        assets: { cash: 1.0, goodwill: 0.0, others: 64.0 },
        liabilities: { debt: 10.0, others: 44.0 },
        equity: 11.0,
      },
      deal: {
        assets: { cash: 0.5, goodwill: 0.0, others: 60.0 },
        liabilities: { debt: 40.0, others: 20.0 },
        equity: 0.5,
      },
      investment: { amount: 30.0, method: "off_balance" },
      after_actual: {
        assets: { cash: 0.0, goodwill: 0.0, others: 0.0 },
        liabilities: { debt: 50.0, others: 10.0 },
        equity: -60.0,
      },
      stockPrice: {
        before: 90,
        deal: 15,
        after: 0,
        unit: "$",
        curve: "crash_early",
      },
      news: [
        { year: 2001, type: "audit", headline: "簿外債務の発覚。数百の特別目的会社(SPE)へ負債を飛ばしていたことが露呈", isCritical: true },
        { year: 2001, type: "audit", headline: "アーサー・アンダーセン（監査法人）による隠蔽協力の疑い。解体へ", isCritical: true },
        { year: 2001, type: "official", headline: "米史上最大（当時）の経営破綻。B/Sへの信頼性が根本から揺らぐ", isCritical: true },
      ],
      summary: { totalImpairment: 60.0 },
    },
  },
  // ── 任天堂 ──
  {
    stage_id: "nintendo_2012",
    tag: null,
    company_name: "任天堂",
    category: "構造改革",
    stage_name: "任天堂 (圧倒的キャッシュの守備力)",
    investment_target: "ゲーム機事業立て直し",
    before_year: 2011,
    after_year: 2021,
    unit: "1,000億円",
    description:
      "現金を溜め込む「任天堂経営」が、危機の時にどれだけ強いかを示す事例。3DS不振・Wii U苦戦で創業以来初の営業赤字に転落したが、無借金の鉄壁B/Sで数年の赤字を耐え凌ぎ、Nintendo Switchで大逆転を果たした。",
    data: {
      before: {
        assets: { cash: 8.5, goodwill: 0.0, others: 6.0 },
        liabilities: { debt: 0.0, others: 1.5 },
        equity: 13.0,
      },
      deal: {
        assets: { cash: 6.5, goodwill: 0.0, others: 6.5 },
        liabilities: { debt: 0.0, others: 1.5 },
        equity: 11.5,
      },
      investment: { amount: 0, method: "cash_reserves" },
      after_actual: {
        assets: { cash: 15.0, goodwill: 0.0, others: 10.0 },
        liabilities: { debt: 0.0, others: 5.0 },
        equity: 20.0,
      },
      stockPrice: {
        before: 25000,
        deal: 12000,
        after: 60000,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2012, type: "official", headline: "3DS不振、Wii U苦戦で創業以来初の営業赤字。しかし無借金は維持" },
        { year: 2014, type: "financial", headline: "巨額の現金があるため、数年の赤字でもGC注記の気配すらなし" },
        { year: 2017, type: "official", headline: "Nintendo Switch発売。溜め込んだ現金で次世代機を開発し、世界を席巻" },
      ],
      summary: { totalImpairment: 0.5 },
    },
  },
  // ── ライブドア ──
  {
    stage_id: "livedoor_2006",
    tag: null,
    company_name: "ライブドア",
    category: "利益操作",
    stage_name: "ライブドア (虚飾のB/Sバブル)",
    investment_target: "IT企業買収・株式分割",
    before_year: 2004,
    after_year: 2007,
    unit: "1,000億円",
    description:
      "資産の中身を操作し、偽の利益でB/Sを「塗り固めた」新興ITの末路。株式分割を繰り返して時価総額を意図的に膨張させたが、2006年に検察の強制捜査で架空売上と粉飾決算が露呈。ライブドア・ショックで東証が取引停止に追い込まれた。",
    data: {
      before: {
        assets: { cash: 0.5, goodwill: 0.0, others: 0.5 },
        liabilities: { debt: 0.2, others: 0.3 },
        equity: 0.5,
      },
      deal: {
        assets: { cash: 2.0, goodwill: 0.5, others: 1.5 },
        liabilities: { debt: 1.0, others: 1.0 },
        equity: 2.0,
      },
      investment: { amount: 0.5, method: "stock_financed" },
      after_actual: {
        assets: { cash: 0.5, goodwill: 0.0, others: 0.2 },
        liabilities: { debt: 1.0, others: 0.5 },
        equity: -0.8,
      },
      stockPrice: {
        before: 300,
        deal: 800,
        after: 0,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2005, type: "official", headline: "ニッポン放送買収劇。株式分割を繰り返し、時価総額を意図的に膨張" },
        { year: 2006, type: "audit", headline: "検察による強制捜査。架空売上の計上と粉飾決算が露呈", isCritical: true },
        { year: 2006, type: "official", headline: "ライブドア・ショック発生。東証が取引停止、後に上場廃止へ", isCritical: true },
      ],
      summary: { totalImpairment: 1.5 },
    },
  },
  // ── メルカリ ──
  {
    stage_id: "mercari_2018",
    tag: null,
    company_name: "メルカリ",
    category: "事業進出",
    stage_name: "メルカリ (赤字覚悟の米国侵攻)",
    investment_target: "米国事業展開",
    before_year: 2018,
    after_year: 2024,
    unit: "1,000億円",
    description:
      "国内の利益を全て米国事業（その他資産）に投入し、B/Sをギリギリまで耐えさせた挑戦の記録。年間400億円の広告宣伝費でキャッシュを焼きながらも、国内事業の黒字で補填し、2023年に悲願の連結黒字化を達成した。",
    data: {
      before: {
        assets: { cash: 1.1, goodwill: 0.0, others: 0.4 },
        liabilities: { debt: 0.1, others: 0.5 },
        equity: 0.9,
      },
      deal: {
        assets: { cash: 1.5, goodwill: 0.0, others: 1.0 },
        liabilities: { debt: 0.8, others: 1.0 },
        equity: 0.7,
      },
      investment: { amount: 0.5, method: "cash_to_capex" },
      after_actual: {
        assets: { cash: 2.0, goodwill: 0.0, others: 1.5 },
        liabilities: { debt: 1.2, others: 1.3 },
        equity: 1.0,
      },
      stockPrice: {
        before: 5000,
        deal: 3000,
        after: 2500,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2019, type: "official", headline: "米国事業での苦戦続く。年間400億円の広告宣伝費でキャッシュを焼く" },
        { year: 2021, type: "financial", headline: "国内事業の黒字で米国赤字を補填。借入による資金繰りも安定化" },
        { year: 2023, type: "official", headline: "悲願の黒字化達成。B/Sの健全性を維持しつつ米国展開を継続" },
      ],
      summary: { totalImpairment: 0.0 },
    },
  },
  // ── テスラ (Model 3 生産地獄) ──
  {
    stage_id: "tesla_2017",
    tag: "超成長",
    company_name: "Tesla",
    category: "事業進出",
    stage_name: "Tesla (Model 3 生産地獄)",
    investment_target: "Model 3量産投資",
    before_year: 2017,
    after_year: 2023,
    unit: "10億ドル",
    description:
      "2017年、TeslaはModel 3の量産を開始したが、生産ラインの過度な自動化に失敗し「生産地獄」に突入。手元現金は急速に減少し、イーロン・マスクCEOが破産の可能性に言及するほど追い込まれた。しかし2019年以降、生産体制の確立とEV需要の爆発により世界最大のEVメーカーへと成長した。",
    effects: { cashRundown: true },
    data: {
      before: {
        assets: { cash: 3.5, goodwill: 0, others: 25.0 },
        liabilities: { debt: 10.0, others: 14.5 },
        equity: 4.0,
      },
      deal: {
        assets: { cash: 2.0, goodwill: 0, others: 28.0 },
        liabilities: { debt: 12.0, others: 14.0 },
        equity: 4.0,
      },
      investment: { amount: 10.0, method: "debt_financed" },
      after_actual: {
        assets: { cash: 16.0, goodwill: 0.2, others: 90.0 },
        liabilities: { debt: 5.0, others: 58.0 },
        equity: 43.2,
      },
      stockPrice: {
        before: 22,
        deal: 12,
        after: 250,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2017, headline: "Tesla、Model 3量産開始も「生産地獄」に突入。週5,000台目標に遠く及ばず", isBreaking: true },
        { year: 2018, type: "financial", headline: "手元現金が急減。イーロン・マスクCEOが「破産まであと数週間だった」と後に告白", isCritical: true },
        { year: 2020, headline: "Tesla株が年初来8倍。S&P500に採用、時価総額がトヨタを超える", isBreaking: true },
        { year: 2023, headline: "世界EV販売トップを維持。営業利益率は自動車業界最高水準に" },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  // ── スカイマーク ──
  {
    stage_id: "skymark_2011",
    tag: null,
    company_name: "スカイマーク",
    category: "設備投資",
    stage_name: "スカイマーク (A380の巨大な賭け)",
    investment_target: "超大型機A380発注",
    before_year: 2011,
    after_year: 2015,
    unit: "100億円",
    description:
      "LCCの先駆けとして躍進していたスカイマークは、超大型機エアバスA380を6機（約1,900億円）発注するという大胆な賭けに出た。しかし円安・燃油高に加え国内線市場の縮小が直撃。A380キャンセルで巨額違約金を抱え、2015年に民事再生法を申請した。",
    effects: { debtExplosion: true },
    data: {
      before: {
        assets: { cash: 3.0, goodwill: 0, others: 5.0 },
        liabilities: { debt: 1.0, others: 2.0 },
        equity: 5.0,
      },
      deal: {
        assets: { cash: 1.5, goodwill: 0, others: 8.0 },
        liabilities: { debt: 4.0, others: 2.5 },
        equity: 3.0,
      },
      investment: { amount: 6.0, method: "debt_financed" },
      after_actual: {
        assets: { cash: 0.3, goodwill: 0, others: 3.0 },
        liabilities: { debt: 7.0, others: 4.0 },
        equity: -7.7,
      },
      stockPrice: {
        before: 1200,
        deal: 800,
        after: 0,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2011, headline: "スカイマーク、超大型機A380を6機発注。約1,900億円の巨額投資", isBreaking: true },
        { year: 2013, headline: "円安と燃油高で業績悪化。A380の違約金リスクが浮上" },
        { year: 2014, type: "official", headline: "A380発注をキャンセル。エアバスから約700億円の違約金を請求される", isCritical: true },
        { year: 2015, type: "audit_warning", subtype: "going_concern", headline: "民事再生法を申請。負債総額約710億円。全株式が無価値に", severity: "high", isCritical: true },
      ],
      summary: { totalImpairment: 8.0 },
    },
  },
  // ── Netflix ──
  {
    stage_id: "netflix_2017",
    tag: "超成長",
    company_name: "Netflix",
    category: "事業進出",
    stage_name: "Netflix (コンテンツ軍拡競争)",
    investment_target: "オリジナルコンテンツ投資",
    before_year: 2017,
    after_year: 2024,
    unit: "10億ドル",
    description:
      "2017年、Netflixはオリジナルコンテンツへの年間投資を60億ドル超に拡大。巨額の社債を発行してフリーキャッシュフローは大幅マイナスが続いた。2022年の会員数初減少で株価は暴落したが、広告付きプランとパスワード共有対策で反転。会員数2.8億人を突破し黒字体質へ転換した。",
    data: {
      before: {
        assets: { cash: 2.0, goodwill: 0.5, others: 16.5 },
        liabilities: { debt: 5.0, others: 5.0 },
        equity: 9.0,
      },
      deal: {
        assets: { cash: 3.0, goodwill: 0.5, others: 21.5 },
        liabilities: { debt: 10.0, others: 6.0 },
        equity: 9.0,
      },
      investment: { amount: 8.0, method: "debt_financed" },
      after_actual: {
        assets: { cash: 7.0, goodwill: 0.5, others: 42.5 },
        liabilities: { debt: 14.0, others: 12.0 },
        equity: 24.0,
      },
      stockPrice: {
        before: 50,
        deal: 55,
        after: 700,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2017, headline: "Netflix、オリジナルコンテンツに年間60億ドル超を投資。社債での資金調達が続く", isBreaking: true },
        { year: 2019, headline: "有料会員1.5億人突破。しかしフリーキャッシュフローは大幅マイナスが続く" },
        { year: 2022, type: "official", headline: "会員数が初の減少。株価が約70%下落。広告付きプランの導入を決定", isCritical: true },
        { year: 2024, headline: "会員数2.8億人突破。フリーCF黒字化を達成し、コンテンツ投資が実を結ぶ", isBreaking: true },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  // ── NVIDIA ──
  {
    stage_id: "nvidia_2020",
    tag: "超成長",
    company_name: "NVIDIA",
    category: "設備投資",
    stage_name: "NVIDIA (AI半導体の覇者)",
    investment_target: "AI・データセンター投資",
    before_year: 2020,
    after_year: 2024,
    unit: "10億ドル",
    description:
      "2020年、NVIDIAのデータセンター向けGPU売上がゲーミングを初めて上回り、AI半導体メーカーへの転換が始まった。2022年の仮想通貨バブル崩壊とArm買収断念で株価は下落したが、ChatGPTブームでAI向け半導体需要が爆発。時価総額3兆ドルを突破し世界最大の半導体企業となった。",
    effects: { aiCircuitGlow: true },
    data: {
      before: {
        assets: { cash: 11.0, goodwill: 4.0, others: 22.0 },
        liabilities: { debt: 6.0, others: 6.0 },
        equity: 25.0,
      },
      deal: {
        assets: { cash: 8.0, goodwill: 4.0, others: 28.0 },
        liabilities: { debt: 11.0, others: 6.0 },
        equity: 23.0,
      },
      investment: { amount: 10.0, method: "mixed" },
      after_actual: {
        assets: { cash: 32.0, goodwill: 25.0, others: 40.0 },
        liabilities: { debt: 9.0, others: 22.0 },
        equity: 66.0,
      },
      stockPrice: {
        before: 15,
        deal: 12,
        after: 130,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2020, headline: "NVIDIA、データセンター売上がゲーミングを初めて上回る。AI時代の幕開け", isBreaking: true },
        { year: 2022, type: "official", headline: "仮想通貨バブル崩壊でGPU在庫過剰。Arm買収を断念、株価40%下落", isCritical: true },
        { year: 2023, headline: "ChatGPTブームでAI半導体の需要爆発。時価総額1兆ドル突破", isBreaking: true },
        { year: 2024, headline: "時価総額3兆ドル。データセンター売上が前年比3倍に急伸" },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  // ── ニトリ ──
  {
    stage_id: "nitori_2015",
    tag: "筋肉質",
    company_name: "ニトリ",
    category: "設備投資",
    stage_name: "ニトリ (連続増益の鉄人)",
    investment_target: "グローバル展開・物流投資",
    before_year: 2015,
    after_year: 2024,
    unit: "1,000億円",
    description:
      "ニトリは「お、ねだん以上。」を掲げ、製造物流小売業（SPA）モデルで圧倒的なコスト競争力を構築。自社物流網への投資を続けながらも、実質無借金経営と連続増収増益を30期以上維持する筋肉質なB/Sで、家具業界の覇者となった。",
    data: {
      before: {
        assets: { cash: 1.0, goodwill: 0, others: 4.0 },
        liabilities: { debt: 0.3, others: 1.2 },
        equity: 3.5,
      },
      deal: {
        assets: { cash: 0.8, goodwill: 0.2, others: 5.5 },
        liabilities: { debt: 0.5, others: 2.0 },
        equity: 4.0,
      },
      investment: { amount: 2.0, method: "cash_to_capex" },
      after_actual: {
        assets: { cash: 1.5, goodwill: 0.3, others: 10.0 },
        liabilities: { debt: 1.0, others: 3.5 },
        equity: 7.3,
      },
      stockPrice: {
        before: 8000,
        deal: 10000,
        after: 18000,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2015, headline: "ニトリ、28期連続増収増益を達成。海外展開を本格化" },
        { year: 2020, headline: "コロナ禍の巣ごもり需要で売上急増。自社物流網が強みに", isBreaking: true },
        { year: 2024, headline: "37期連続増収増益。実質無借金を維持しグローバル1,000店舗に迫る", isBreaking: true },
      ],
      summary: { totalImpairment: 0 },
    },
  },
  // ── ZOZO ──
  {
    stage_id: "zozo_2018",
    tag: null,
    company_name: "ZOZO",
    category: "資本政策",
    stage_name: "ZOZO (前澤時代の光と影)",
    investment_target: "PB事業・ZOZOSUIT展開",
    before_year: 2018,
    after_year: 2023,
    unit: "100億円",
    description:
      "2018年、ZOZOは前澤友作社長のもとPB（プライベートブランド）事業「ZOZOSUIT」に大きく賭けた。しかしPB事業は失敗に終わり前澤氏は退任。2019年にヤフー（現LINEヤフー）がTOBで子会社化し、安定経営路線へ転換。EC事業の強みを活かして取扱高は過去最高を更新した。",
    data: {
      before: {
        assets: { cash: 4.0, goodwill: 0, others: 3.0 },
        liabilities: { debt: 0.5, others: 3.0 },
        equity: 3.5,
      },
      deal: {
        assets: { cash: 2.0, goodwill: 0, others: 4.0 },
        liabilities: { debt: 0.5, others: 2.5 },
        equity: 3.0,
      },
      investment: { amount: 2.0, method: "cash_to_capex" },
      after_actual: {
        assets: { cash: 5.0, goodwill: 0, others: 5.0 },
        liabilities: { debt: 1.0, others: 4.0 },
        equity: 5.0,
      },
      stockPrice: {
        before: 4500,
        deal: 1500,
        after: 3200,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2018, headline: "ZOZO、PB事業「ZOZOSUIT」を大々的に展開。前澤社長が月旅行計画を発表", isBreaking: true },
        { year: 2019, type: "official", headline: "PB事業撤退。前澤社長退任。ヤフーがTOBで子会社化を決定", isCritical: true },
        { year: 2023, headline: "Yahoo/LINE傘下で安定成長。ZOZOTOWNの取扱高が過去最高を更新" },
      ],
      summary: { totalImpairment: 1.0 },
    },
  },
  // ── 三菱自動車 ──
  {
    stage_id: "mitsubishi_motors_2013",
    tag: null,
    company_name: "三菱自動車",
    category: "利益操作",
    stage_name: "三菱自動車 (燃費不正25年)",
    investment_target: "軽自動車事業拡大",
    before_year: 2013,
    after_year: 2017,
    unit: "1,000億円",
    description:
      "三菱自動車は2000年代のリコール問題から復活し、軽自動車事業で業績を回復させていた。しかし2016年、軽自動車の燃費データを25年間にわたり不正に操作していたことが発覚。単独での再建が困難となり、日産自動車が2,370億円で34%の株式を取得し筆頭株主となった。",
    data: {
      before: {
        assets: { cash: 4.0, goodwill: 0, others: 12.0 },
        liabilities: { debt: 3.0, others: 7.0 },
        equity: 6.0,
      },
      deal: {
        assets: { cash: 5.0, goodwill: 0, others: 14.0 },
        liabilities: { debt: 2.5, others: 8.0 },
        equity: 8.5,
      },
      investment: { amount: 0, method: "mixed" },
      after_actual: {
        assets: { cash: 5.5, goodwill: 0, others: 11.0 },
        liabilities: { debt: 2.0, others: 8.0 },
        equity: 6.5,
      },
      stockPrice: {
        before: 1100,
        deal: 1200,
        after: 700,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2013, headline: "三菱自動車、リコール問題からの復活を宣言。軽自動車事業を拡大" },
        { year: 2016, type: "audit", headline: "軽自動車の燃費データ不正が発覚。25年間にわたる組織的不正と判明", isCritical: true },
        { year: 2016, type: "official", headline: "日産自動車が34%の株式を2,370億円で取得。筆頭株主として再建を主導", isBreaking: true },
        { year: 2017, headline: "日産傘下で再建開始。燃費不正の補償費用を計上し、信頼回復へ" },
      ],
      summary: { totalImpairment: 1.5 },
    },
  },
  // ── Lenovo ──
  {
    stage_id: "lenovo_2005",
    tag: null,
    company_name: "Lenovo",
    category: "買収",
    stage_name: "Lenovo (ThinkPadを継ぐ者)",
    investment_target: "IBM PC事業買収",
    before_year: 2005,
    after_year: 2015,
    unit: "10億ドル",
    description:
      "2005年、中国のLenovoはIBMのPC事業を17.5億ドルで買収し、一夜にして世界3位のPCメーカーとなった。「中国企業にThinkPadブランドは扱えない」との懐疑論が渦巻いたが、巧みなブランド統合でPC市場シェアを拡大。2014年には世界PC市場でシェア1位を獲得した。",
    data: {
      before: {
        assets: { cash: 1.0, goodwill: 0, others: 2.0 },
        liabilities: { debt: 0.5, others: 1.0 },
        equity: 1.5,
      },
      deal: {
        assets: { cash: 0.8, goodwill: 3.0, others: 4.0 },
        liabilities: { debt: 2.5, others: 3.5 },
        equity: 1.8,
      },
      investment: { amount: 1.75, method: "mixed" },
      after_actual: {
        assets: { cash: 2.5, goodwill: 5.5, others: 17.0 },
        liabilities: { debt: 3.0, others: 15.0 },
        equity: 7.0,
      },
      stockPrice: {
        before: 2.5,
        deal: 3.0,
        after: 10.0,
        unit: "HK$",
        curve: "surge_early",
      },
      news: [
        { year: 2005, headline: "中国Lenovo、IBMのPC事業を17.5億ドルで買収。世界3位のPCメーカーに", isBreaking: true },
        { year: 2008, headline: "リーマンショックで業績悪化。PC需要急減も、ThinkPadブランドで耐える" },
        { year: 2014, headline: "世界PC市場でシェア1位を獲得。IBM×Lenovoの統合が成功", isBreaking: true },
      ],
      summary: { totalImpairment: 0.5 },
    },
  },
  // ── 中国恒大集団 ──
  {
    stage_id: "evergrande_2018",
    tag: "崩壊",
    company_name: "中国恒大集団",
    category: "投資",
    stage_name: "中国恒大集団 (不動産バブルの崩壊)",
    investment_target: "不動産開発拡大",
    before_year: 2018,
    after_year: 2023,
    unit: "100億元",
    description:
      "中国恒大集団は2018年に売上高5,000億元を突破し、世界最大級の不動産開発会社となった。しかし中国政府の「三条紅線」政策による不動産融資規制が直撃。2021年にドル建て社債のデフォルトが確定し、負債総額2.4兆元（約48兆円）という史上最大級の企業破綻へと向かった。",
    effects: { evergrandeShatter: true },
    data: {
      before: {
        assets: { cash: 15.0, goodwill: 0, others: 160.0 },
        liabilities: { debt: 60.0, others: 95.0 },
        equity: 20.0,
      },
      deal: {
        assets: { cash: 10.0, goodwill: 0, others: 200.0 },
        liabilities: { debt: 80.0, others: 115.0 },
        equity: 15.0,
      },
      investment: { amount: 50.0, method: "debt_financed" },
      after_actual: {
        assets: { cash: 1.0, goodwill: 0, others: 100.0 },
        liabilities: { debt: 90.0, others: 130.0 },
        equity: -119.0,
      },
      stockPrice: {
        before: 25,
        deal: 20,
        after: 0,
        unit: "HK$",
        curve: "crash_early",
      },
      news: [
        { year: 2018, headline: "中国恒大集団、売上高5,000億元突破。世界最大級の不動産開発会社に", isBreaking: true },
        { year: 2021, type: "official", subtype: "going_concern", headline: "ドル建て社債の利払い不能。債務不履行（デフォルト）が確定", isCritical: true },
        { year: 2023, type: "audit", headline: "負債総額2.4兆元（約48兆円）。米国で破産法15条を申請", isCritical: true },
      ],
      summary: { totalImpairment: 100.0 },
    },
  },
  // ── セブン＆アイ ──
  {
    stage_id: "seven_i_2023",
    tag: "筋肉質",
    company_name: "セブン＆アイ",
    category: "構造改革",
    stage_name: "セブン＆アイ (聖域なき事業分離)",
    investment_target: "そごう・西武売却と事業再編",
    before_year: 2021,
    after_year: 2024,
    unit: "1,000億円",
    description:
      "「百貨店」という巨大な重石を切り離し、コンビニ（CVS）に特化した筋肉質なB/Sへ作り替える過程。2021年に米コンビニ大手スピードウェイを2兆円超で買収し巨額ののれんが発生。2023年に物言う株主の要求を受けそごう・西武を売却し不採算資産を一掃した。",
    data: {
      before: {
        assets: { cash: 15.0, goodwill: 10.0, others: 55.0 },
        liabilities: { debt: 30.0, others: 25.0 },
        equity: 25.0,
      },
      deal: {
        assets: { cash: 18.0, goodwill: 30.0, others: 85.0 },
        liabilities: { debt: 45.0, others: 53.0 },
        equity: 35.0,
      },
      investment: { amount: 20.0, method: "debt_financed" },
      after_actual: {
        assets: { cash: 16.0, goodwill: 25.0, others: 75.0 },
        liabilities: { debt: 38.0, others: 45.0 },
        equity: 33.0,
      },
      stockPrice: {
        before: 4500,
        deal: 5500,
        after: 6200,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2021, type: "official", headline: "米コンビニ大手スピードウェイを2兆円超で買収。巨額ののれんが発生" },
        { year: 2023, type: "official", headline: "物言う株主の要求を受け、そごう・西武を売却。不採算資産を一掃", isCritical: true },
      ],
      summary: { totalImpairment: 1.5 },
    },
  },
  // ── 富士フイルム ──
  {
    stage_id: "fujifilm_2006",
    tag: "復活",
    company_name: "富士フイルム",
    category: "構造改革",
    stage_name: "富士フイルム (第2の創業)",
    investment_target: "写真から医療への転換",
    before_year: 2000,
    after_year: 2012,
    unit: "1,000億円",
    description:
      "本業（写真フィルム）の市場がゼロになるという絶望から、B/Sの中身を「化粧品・医療」へ完全に入れ替えた。2006年にフィルム需要激減を受け構造改革費用として数千億円を計上しB/Sを整理。2008年には富山化学工業を買収し医薬品へ転換するB/Sを構築した。",
    data: {
      before: {
        assets: { cash: 4.5, goodwill: 0.0, others: 25.5 },
        liabilities: { debt: 3.0, others: 10.0 },
        equity: 17.0,
      },
      deal: {
        assets: { cash: 3.5, goodwill: 1.5, others: 28.0 },
        liabilities: { debt: 5.0, others: 10.0 },
        equity: 18.0,
      },
      investment: { amount: 1.5, method: "mixed" },
      after_actual: {
        assets: { cash: 2.5, goodwill: 3.0, others: 29.5 },
        liabilities: { debt: 6.0, others: 10.0 },
        equity: 19.0,
      },
      stockPrice: {
        before: 4000,
        deal: 4500,
        after: 3500,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2006, type: "official", headline: "フィルム需要が激減。構造改革費用として数千億円を計上しB/Sを整理", isCritical: true },
        { year: 2008, type: "official", headline: "富山化学工業を買収。写真の知見を医薬品へ転換するB/S構築" },
      ],
      summary: { totalImpairment: 2.5 },
    },
  },
  // ── 東京電力 ──
  {
    stage_id: "tepco_2011",
    tag: "崩壊",
    company_name: "東京電力",
    category: "構造改革",
    stage_name: "東京電力 (国有化と賠償債務)",
    investment_target: "原発事故の賠償対応",
    before_year: 2010,
    after_year: 2013,
    unit: "1,000億円",
    description:
      "一瞬で賠償債務という「見えない巨大な負債」を背負い、事実上の国有化となった歴史的変容。2011年の福島第一原発事故で賠償債務により債務超過の危機に直面。原子力損害賠償支援機構により1兆円の公的資金が注入され事実上の国有化となった。",
    data: {
      before: {
        assets: { cash: 3.0, goodwill: 0.0, others: 127.0 },
        liabilities: { debt: 75.0, others: 30.0 },
        equity: 25.0,
      },
      deal: {
        assets: { cash: 15.0, goodwill: 0.0, others: 135.0 },
        liabilities: { debt: 100.0, others: 50.0 },
        equity: 0.0,
      },
      investment: { amount: 0, method: "restructuring" },
      after_actual: {
        assets: { cash: 12.0, goodwill: 0.0, others: 140.0 },
        liabilities: { debt: 80.0, others: 65.0 },
        equity: 7.0,
      },
      stockPrice: {
        before: 2200,
        deal: 200,
        after: 500,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2011, type: "official", subtype: "going_concern", headline: "福島第一原発事故発生。賠償債務により債務超過の危機に直面", isCritical: true },
        { year: 2012, type: "financial", headline: "原子力損害賠償支援機構により1兆円の公的資金注入。事実上の国有化", isCritical: true },
      ],
      summary: { totalImpairment: 15.0 },
    },
  },
  // ── Nokia ──
  {
    stage_id: "nokia_2013",
    tag: "崩壊",
    company_name: "Nokia",
    category: "買収",
    stage_name: "Nokia (王者の転落と減損)",
    investment_target: "Microsoftによる携帯事業買収",
    before_year: 2007,
    after_year: 2015,
    unit: "10億ドル",
    description:
      "スマホ王者の凋落と、マイクロソフトによる買収、そしてその後の「のれん全額減損」までの末路。2011年にエロップCEOが『燃え盛るプラットフォーム』を宣言しiPhone猛追に失敗。2015年にMSがノキア事業の大半（約9000億円）を減損しB/S上の価値が霧散した。",
    data: {
      before: {
        assets: { cash: 11.0, goodwill: 0.0, others: 26.5 },
        liabilities: { debt: 1.0, others: 20.0 },
        equity: 16.5,
      },
      deal: {
        assets: { cash: 9.0, goodwill: 0.0, others: 18.0 },
        liabilities: { debt: 5.0, others: 14.0 },
        equity: 8.0,
      },
      investment: { amount: 0, method: "mixed" },
      after_actual: {
        assets: { cash: 7.0, goodwill: 0.0, others: 15.0 },
        liabilities: { debt: 2.0, others: 10.0 },
        equity: 10.0,
      },
      stockPrice: {
        before: 40,
        deal: 5,
        after: 6,
        unit: "$",
        curve: "crash_early",
      },
      news: [
        { year: 2011, type: "official", headline: "エロップCEO『燃え盛るプラットフォーム』宣言。iPhone猛追に失敗", isCritical: true },
        { year: 2015, type: "audit", headline: "MSがノキア事業の大半（約9000億円）を減損。B/S上の価値が霧散", isCritical: true },
      ],
      summary: { totalImpairment: 9.0 },
    },
  },
  // ── RIZAP ──
  {
    stage_id: "rizap_2018",
    tag: null,
    company_name: "RIZAP",
    category: "利益操作",
    stage_name: "RIZAP (負ののれんの錬金術)",
    investment_target: "大量M&Aと負ののれん",
    before_year: 2016,
    after_year: 2019,
    unit: "1,000億円",
    description:
      "赤字企業を格安で買い、「負ののれん」で利益が出ているように見せる「B/S錬金術」の光と影。2017年にM&Aを連発し負ののれんにより利益が劇的に増加して見えたが、2018年に拡大路線を凍結。瀬戸社長が『負ののれんに頼りすぎた』と反省した。",
    data: {
      before: {
        assets: { cash: 0.1, goodwill: 0.0, others: 0.4 },
        liabilities: { debt: 0.1, others: 0.3 },
        equity: 0.1,
      },
      deal: {
        assets: { cash: 0.3, goodwill: 0.1, others: 1.2 },
        liabilities: { debt: 0.6, others: 0.8 },
        equity: 0.2,
      },
      investment: { amount: 0.1, method: "debt_financed" },
      after_actual: {
        assets: { cash: 0.2, goodwill: 0.3, others: 1.5 },
        liabilities: { debt: 1.0, others: 0.9 },
        equity: 0.1,
      },
      stockPrice: {
        before: 200,
        deal: 1500,
        after: 200,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2017, type: "official", headline: "M&Aを連発。『負ののれん』により利益が劇的に増加して見える魔法" },
        { year: 2018, type: "official", headline: "拡大路線を凍結。瀬戸社長『負ののれんに頼りすぎた』と反省", isCritical: true },
      ],
      summary: { totalImpairment: 0.5 },
    },
  },
  // ── ルネサス ──
  {
    stage_id: "renesas_2012",
    tag: "復活",
    company_name: "ルネサス",
    category: "構造改革",
    stage_name: "ルネサス (日の丸半導体の執念)",
    investment_target: "産業革新機構による再生",
    before_year: 2012,
    after_year: 2023,
    unit: "1,000億円",
    description:
      "巨額赤字から産業革新機構主導でB/Sをリセットし、現在は世界屈指の高収益企業へ。2013年に産業革新機構が1500億円出資し圧倒的資金で工場の統廃合に着手。2021年には英ダイアログを約6700億円で買収しM&Aによる資産の質的向上を実現した。",
    data: {
      before: {
        assets: { cash: 0.8, goodwill: 0.0, others: 7.0 },
        liabilities: { debt: 3.0, others: 3.0 },
        equity: 1.8,
      },
      deal: {
        assets: { cash: 2.3, goodwill: 0.0, others: 6.0 },
        liabilities: { debt: 3.5, others: 3.3 },
        equity: 1.5,
      },
      investment: { amount: 1.5, method: "equity_financed" },
      after_actual: {
        assets: { cash: 4.5, goodwill: 10.0, others: 16.0 },
        liabilities: { debt: 9.0, others: 6.5 },
        equity: 15.0,
      },
      stockPrice: {
        before: 300,
        deal: 400,
        after: 2500,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2013, type: "financial", headline: "産業革新機構が1500億円出資。圧倒的資金で工場の統廃合に着手", isCritical: true },
        { year: 2021, type: "official", headline: "英ダイアログを約6700億円で買収。M&Aによる資産の質的向上" },
      ],
      summary: { totalImpairment: 1.0 },
    },
  },
  // ── Wirecard ──
  {
    stage_id: "wirecard_2020",
    tag: "崩壊",
    company_name: "Wirecard",
    category: "利益操作",
    stage_name: "Wirecard (19億ユーロの幽霊資産)",
    investment_target: "架空の現金・決済事業",
    before_year: 2018,
    after_year: 2020,
    unit: "10億ドル",
    description:
      "B/Sに計上されていた「現金」が、実はフィリピンの銀行にもどこにも存在しなかった衝撃の不正。2020年にEY（監査法人）が現金19億ユーロの確認不能を報告し残高証明は偽造と判明。同年に破産申請し元CEOは逮捕。ドイツ株価指数(DAX)採用企業で初の破綻となった。",
    data: {
      before: {
        assets: { cash: 3.0, goodwill: 1.0, others: 2.5 },
        liabilities: { debt: 1.5, others: 3.0 },
        equity: 2.0,
      },
      deal: {
        assets: { cash: 4.5, goodwill: 1.5, others: 3.5 },
        liabilities: { debt: 3.0, others: 4.0 },
        equity: 2.5,
      },
      investment: { amount: 0, method: "off_balance" },
      after_actual: {
        assets: { cash: 0.0, goodwill: 0.0, others: 2.0 },
        liabilities: { debt: 4.0, others: 3.0 },
        equity: -5.0,
      },
      stockPrice: {
        before: 150,
        deal: 120,
        after: 0,
        unit: "€",
        curve: "crash_early",
      },
      news: [
        { year: 2020, type: "audit", headline: "EY（監査法人）、現金19億ユーロの確認不能を報告。残高証明は偽造", isCritical: true },
        { year: 2020, type: "official", subtype: "going_concern", headline: "破産申請。元CEOは逮捕。ドイツ株価指数(DAX)採用企業で初の破綻", isCritical: true },
      ],
      summary: { totalImpairment: 25.0 },
    },
  },
  // ── GM (ゼネラルモーターズ) ──
  {
    stage_id: "gm_2009",
    tag: "復活",
    company_name: "GM",
    category: "構造改革",
    stage_name: "GM (巨大戦艦の沈没と再浮上)",
    investment_target: "チャプター11と政府再建",
    before_year: 2007,
    after_year: 2010,
    unit: "10億ドル",
    description:
      "リーマンショックで資金繰りが停止し、米政府の介入により「旧GM」を切り捨てて再生した事例。2009年にチャプター11申請。負債1700億ドルの巨大倒産だったが政府出資により再建。2010年に再上場を達成し「新生GM」として高収益体質へ転換した。",
    data: {
      before: {
        assets: { cash: 2.5, goodwill: 0.0, others: 12.0 },
        liabilities: { debt: 14.0, others: 4.0 },
        equity: -3.5,
      },
      deal: {
        assets: { cash: 1.5, goodwill: 0.0, others: 8.0 },
        liabilities: { debt: 17.0, others: 5.0 },
        equity: -12.5,
      },
      investment: { amount: 0, method: "restructuring" },
      after_actual: {
        assets: { cash: 2.8, goodwill: 0.0, others: 11.0 },
        liabilities: { debt: 1.5, others: 3.5 },
        equity: 8.8,
      },
      stockPrice: {
        before: 35,
        deal: 1,
        after: 33,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2009, type: "official", subtype: "going_concern", headline: "チャプター11申請。負債1700億ドルの巨大倒産。政府出資により再建", isCritical: true },
        { year: 2010, type: "official", headline: "再上場達成。負債を切り離した『新生GM』として高収益体質へ" },
      ],
      summary: { totalImpairment: 10.0 },
    },
  },
  // ── あおぞら銀行 ──
  {
    stage_id: "aozora_2024",
    tag: null,
    company_name: "あおぞら銀行",
    category: "投資",
    stage_name: "あおぞら銀行 (オフィス融資の落とし穴)",
    investment_target: "米不動産融資",
    before_year: 2022,
    after_year: 2024,
    unit: "1,000億円",
    description:
      "米国のオフィス市況悪化により、引当金（その他負債）が急増し、長年の安定B/Sが崩れた事例。2024年に米不動産向け融資で巨額の引当金を計上し15年ぶりの最終赤字に転落。無配転落し、預金者の不安を抑えるため厚い自己資本の維持をアピールした。",
    data: {
      before: {
        assets: { cash: 15.0, goodwill: 0.0, others: 45.0 },
        liabilities: { debt: 10.0, others: 45.0 },
        equity: 5.0,
      },
      deal: {
        assets: { cash: 14.0, goodwill: 0.0, others: 48.0 },
        liabilities: { debt: 12.0, others: 45.0 },
        equity: 5.0,
      },
      investment: { amount: 0, method: "mixed" },
      after_actual: {
        assets: { cash: 12.0, goodwill: 0.0, others: 50.0 },
        liabilities: { debt: 15.0, others: 43.0 },
        equity: 4.0,
      },
      stockPrice: {
        before: 2800,
        deal: 3200,
        after: 2100,
        unit: "円",
        curve: "crash_early",
      },
      news: [
        { year: 2024, type: "official", headline: "米不動産向け融資で巨額の引当金を計上。15年ぶりの最終赤字へ", isCritical: true },
        { year: 2024, type: "official", headline: "無配転落。預金者の不安を抑えるため、厚い自己資本の維持をアピール", isCritical: true },
      ],
      summary: { totalImpairment: 0.5 },
    },
  },
  // ── Airbnb ──
  {
    stage_id: "airbnb_2020",
    tag: "超成長",
    company_name: "Airbnb",
    category: "資本政策",
    stage_name: "Airbnb (絶望の淵からの上場)",
    investment_target: "コロナ禍での上場と資本調達",
    before_year: 2019,
    after_year: 2021,
    unit: "10億ドル",
    description:
      "「観光終了」と思われたロックダウン下で、全資産を整理し、史上稀に見るタイミングで上場した奇跡。2020年にコロナ直撃で売上80%減。20億ドルの高金利ローンで延命したが、同年12月に上場し時価総額10兆円超。調達資金で負債を一掃した。",
    data: {
      before: {
        assets: { cash: 3.0, goodwill: 0.0, others: 1.0 },
        liabilities: { debt: 0.5, others: 3.0 },
        equity: 0.5,
      },
      deal: {
        assets: { cash: 1.5, goodwill: 0.0, others: 1.5 },
        liabilities: { debt: 2.0, others: 3.5 },
        equity: -2.5,
      },
      investment: { amount: 0, method: "equity_financed" },
      after_actual: {
        assets: { cash: 6.0, goodwill: 0.0, others: 4.0 },
        liabilities: { debt: 2.0, others: 3.5 },
        equity: 4.5,
      },
      stockPrice: {
        before: 0,
        deal: 0,
        after: 150,
        unit: "$",
        curve: "surge_early",
      },
      news: [
        { year: 2020, type: "financial", headline: "コロナ直撃。売上80%減。20億ドルの高金利ローンで延命", isCritical: true },
        { year: 2020, type: "official", headline: "同年12月に上場。時価総額10兆円超。調達資金で負債を一掃" },
      ],
      summary: { totalImpairment: 0.0 },
    },
  },
  // ── 任天堂 (DS/Wii黄金期) ──
  {
    stage_id: "nintendo_2005",
    tag: "筋肉質",
    company_name: "任天堂",
    category: "設備投資",
    stage_name: "任天堂 (ブルーオーシャンの創造)",
    investment_target: "DS/Wii開発",
    before_year: 2005,
    after_year: 2011,
    unit: "1,000億円",
    description:
      "2005年、任天堂はニンテンドーDSとWiiで「ブルーオーシャン戦略」を実行。高性能競争を避け、直感的な操作で非ゲーマー層を開拓した。巨額の現金を持つ無借金経営のB/Sで開発リスクを吸収し、Wiiは世界1億台を突破。「枯れた技術の水平思考」が大成功を収めた。",
    data: {
      before: {
        assets: { cash: 7.0, goodwill: 0, others: 4.0 },
        liabilities: { debt: 0, others: 1.5 },
        equity: 9.5,
      },
      deal: {
        assets: { cash: 6.0, goodwill: 0, others: 5.0 },
        liabilities: { debt: 0, others: 2.0 },
        equity: 9.0,
      },
      investment: { amount: 2.0, method: "cash_reserves" },
      after_actual: {
        assets: { cash: 8.5, goodwill: 0, others: 6.0 },
        liabilities: { debt: 0, others: 1.5 },
        equity: 13.0,
      },
      stockPrice: {
        before: 12000,
        deal: 15000,
        after: 25000,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2005, headline: "任天堂、ニンテンドーDSが世界的大ヒット。携帯ゲーム機市場を席巻", isBreaking: true },
        { year: 2006, headline: "Wii発売。「ゲーム人口の拡大」を掲げ非ゲーマー層を開拓", isBreaking: true },
        { year: 2009, headline: "Wii世界累計販売5,000万台突破。無借金経営を維持しつつ時価総額10兆円に" },
      ],
      summary: { totalImpairment: 0 },
    },
  },
];

/** B/Sデータの資産合計を計算 */
export function bsTotal(bs) {
  return (bs.assets.cash || 0) + (bs.assets.goodwill || 0) + (bs.assets.others || 0);
}

/** ステージの全フェーズの最大資産合計を計算 */
export function getMaxTotal(stage) {
  const { before, deal, after_actual } = stage.data;
  return Math.max(bsTotal(before), bsTotal(deal), bsTotal(after_actual));
}

export function getStage(id) {
  return stages.find((s) => s.stage_id === id);
}

/**
 * 億円単位の金額を表示用にフォーマット。
 * 10,000億円以上は「X兆Y,YYY億円」形式にする。
 */
export function formatOku(oku) {
  const val = Math.round(oku);
  if (val >= 10000) {
    const cho = Math.floor(val / 10000);
    const remainder = val % 10000;
    if (remainder === 0) return `${cho}兆円`;
    return `${cho}兆${remainder.toLocaleString()}億円`;
  }
  return `${val.toLocaleString()}億円`;
}

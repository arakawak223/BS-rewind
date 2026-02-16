export const stages = [
  {
    stage_id: "toshiba_2006",
    company_name: "東芝",
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
        { year: 2016, type: "official", headline: "監査法人：過年度決算の訂正を要求。利益水増し1,562億円", isCritical: true },
        { year: 2017, type: "audit_warning", subtype: "going_concern", headline: "監査法人：『継続企業の前提に関する重要な疑義』を注記", severity: "high", isCritical: true },
        { year: 2017, type: "financial", headline: "メインバンク：融資維持の条件として半導体事業の売却を要求" },
        { year: 2017, headline: "東芝、債務超過で上場廃止の瀬戸際", isBreaking: true },
      ],
      summary: { totalImpairment: 14.5 },
    },
  },
  {
    stage_id: "sharp_2009",
    company_name: "シャープ",
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
        { year: 2013, type: "official", headline: "監査法人：継続企業の前提に重要な疑義を記載", isCritical: true },
        { year: 2015, type: "audit_warning", subtype: "going_concern", headline: "監査法人：『継続企業の前提に関する重要な疑義』— 2期連続注記", severity: "high", isCritical: true },
        { year: 2015, type: "financial", headline: "メインバンク：追加融資の条件として大規模リストラを要求" },
        { year: 2016, headline: "シャープ、鴻海傘下に。日本の液晶神話が終焉", isBreaking: true },
      ],
      summary: { totalImpairment: 11.0 },
    },
  },
  {
    stage_id: "google_2006",
    company_name: "Google",
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
    company_name: "Tesla",
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
    company_name: "パナソニック",
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
        { year: 2012, type: "audit", headline: "監査法人：プラズマ及び三洋関連資産の減損を指摘。2年連続7000億超の赤字", isCritical: true },
        { year: 2013, type: "official", headline: "無配転落：創業以来の危機。金融機関が劣後ローンによる資本支援", isCritical: true },
      ],
      summary: { totalImpairment: 15.0 },
    },
  },
  // ── 楽天グループ ──
  {
    stage_id: "rakuten_2019",
    company_name: "楽天グループ",
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
    company_name: "AOL",
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
      summary: { totalImpairment: 99.0 },
    },
  },
  // ── ソフトバンクグループ ──
  {
    stage_id: "softbank_2019",
    company_name: "ソフトバンクG",
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
    company_name: "ソニー",
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
        { year: 2015, type: "audit", headline: "監査法人：継続企業の前提（GC）注記の検討から脱却。黒字化定着を確認" },
        { year: 2021, type: "official", headline: "純利益1兆円突破。ハードからコンテンツと金融の融合B/Sへ完全転換" },
      ],
      summary: { totalImpairment: 8.0 },
    },
  },
  // ── Apple ──
  {
    stage_id: "apple_2015",
    company_name: "Apple",
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
  // ── 日本航空 (JAL) ──
  {
    stage_id: "jal_2010",
    company_name: "日本航空",
    stage_name: "日本航空 (1.2兆円の債務超過からの翼)",
    investment_target: "会社更生法・法的整理",
    before_year: 2009,
    after_year: 2013,
    unit: "1,000億円",
    description:
      "2010年、日本航空は1兆2,165億円の債務超過で会社更生法を申請。株価は1円に。銀行団の5,215億円の債権放棄と徹底的なリストラを経て、わずか2年で再上場を果たした。B/Sが完全にリセットされた究極の再生事例。",
    data: {
      before: {
        assets: { cash: 5.0, goodwill: 0.0, others: 15.0 },
        liabilities: { debt: 9.0, others: 10.0 },
        equity: 1.0,
      },
      deal: {
        assets: { cash: 4.0, goodwill: 0.0, others: 10.0 },
        liabilities: { debt: 15.0, others: 11.0 },
        equity: -12.0,
      },
      investment: { amount: 0, method: "restructuring" },
      after_actual: {
        assets: { cash: 4.0, goodwill: 0.0, others: 11.0 },
        liabilities: { debt: 1.5, others: 5.0 },
        equity: 8.5,
      },
      stockPrice: {
        before: 200,
        deal: 1,
        after: 3800,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2010, type: "audit", subtype: "going_concern", headline: "会社更生法適用を申請。1兆2165億円の債務超過、株価は1円へ", isCritical: true },
        { year: 2011, type: "financial", headline: "更生計画に基づき、銀行団が5215億円の債権放棄を完了", isCritical: true },
        { year: 2012, type: "official", headline: "奇跡の再上場。高収益体質に生まれ変わり、純資産が劇的に回復" },
      ],
      summary: { totalImpairment: 8.0 },
    },
  },
  // ── 日産自動車 ──
  {
    stage_id: "nissan_1999",
    company_name: "日産自動車",
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
  // ── オリンパス ──
  {
    stage_id: "olympus_2011",
    company_name: "オリンパス",
    stage_name: "オリンパス (消えた損失の行方)",
    investment_target: "損失隠蔽・粉飾発覚",
    before_year: 2010,
    after_year: 2014,
    unit: "1,000億円",
    description:
      "「のれん」を隠れ蓑にして過去の損失を隠蔽した、B/Sミステリーの代表格。2011年にウッドフォード社長が不正を告発し、1,177億円の損失隠しが発覚。ソニーとの資本提携を経て、医療機器事業の強みで再建を果たした。",
    data: {
      before: {
        assets: { cash: 1.5, goodwill: 1.0, others: 8.5 },
        liabilities: { debt: 6.0, others: 3.0 },
        equity: 2.0,
      },
      deal: {
        assets: { cash: 1.0, goodwill: 2.0, others: 7.0 },
        liabilities: { debt: 7.5, others: 3.5 },
        equity: -1.0,
      },
      investment: { amount: 2.0, method: "mixed" },
      after_actual: {
        assets: { cash: 2.0, goodwill: 0.2, others: 7.5 },
        liabilities: { debt: 5.0, others: 2.7 },
        equity: 2.0,
      },
      stockPrice: {
        before: 2500,
        deal: 500,
        after: 3000,
        unit: "円",
        curve: "surge_early",
      },
      news: [
        { year: 2011, type: "audit", headline: "監査法人：不明瞭な買収資金を指摘。1177億円の損失隠しが発覚", isCritical: true },
        { year: 2012, type: "official", headline: "上場廃止の危機を回避。ソニーとの資本提携により500億円の資金注入", isCritical: true },
        { year: 2013, type: "official", headline: "医療機器事業の強みで再建。B/Sから過去の膿を完全に排出" },
      ],
      summary: { totalImpairment: 1.8 },
    },
  },
  // ── リーマン・ブラザーズ ──
  {
    stage_id: "lehman_2008",
    company_name: "リーマン",
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
    company_name: "ダイエー",
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
    company_name: "スターバックス",
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
        { year: 2023, type: "audit", headline: "『稼ぐ力』が強すぎて、マイナスの純資産でも監査法人は適正と判断" },
      ],
      summary: { totalImpairment: 0.0 },
    },
  },
  // ── エンロン ──
  {
    stage_id: "enron_2001",
    company_name: "エンロン",
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
    company_name: "任天堂",
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
    company_name: "ライブドア",
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
    company_name: "メルカリ",
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

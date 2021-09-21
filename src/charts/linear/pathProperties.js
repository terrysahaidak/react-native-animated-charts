import { useRef } from "react";
import { useWorkletCallback } from "react-native-reanimated";

export function useUIValue() {
  const idRef = useRef();

  if (!idRef.current) {
    idRef.current = Date.now() + Math.floor(Math.random() * 10000);
  }

  const { current } = idRef;

  return useWorkletCallback(() => {
    "worklet";

    if (!global.remoteValues) {
      global.remoteValues = {};
    }

    return {
      get value() {
        return global.remoteValues[current];
      },
      set value(value) {
        global.remoteValues[current] = value;
      },
    };
  });
}

export function pathPropertiesModule() {
  "worklet";

  function t(t, n, e) {
    return (
      n in t
        ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[n] = e),
      t
    );
  }
  function n(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return e(t);
      })(t) ||
      (function (t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
          return Array.from(t);
      })(t) ||
      (function (t, n) {
        if (!t) return;
        if ("string" == typeof t) return e(t, n);
        var i = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === i && t.constructor && (i = t.constructor.name);
        if ("Map" === i || "Set" === i) return Array.from(t);
        if (
          "Arguments" === i ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
        )
          return e(t, n);
      })(t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function e(t, n) {
    (null == n || n > t.length) && (n = t.length);
    for (var e = 0, i = new Array(n); e < n; e++) i[e] = t[e];
    return i;
  }
  var i = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 },
    h = /([astvzqmhlc])([^astvzqmhlc]*)/gi,
    r = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi,
    s = function (t) {
      var n = t.match(r);
      return n ? n.map(Number) : [];
    },
    a = function (n, e, i, h) {
      var r = this;
      t(this, "x0", void 0),
        t(this, "x1", void 0),
        t(this, "y0", void 0),
        t(this, "y1", void 0),
        t(this, "getTotalLength", function () {
          return Math.sqrt(Math.pow(r.x0 - r.x1, 2) + Math.pow(r.y0 - r.y1, 2));
        }),
        t(this, "getPointAtLength", function (t) {
          var n =
            t / Math.sqrt(Math.pow(r.x0 - r.x1, 2) + Math.pow(r.y0 - r.y1, 2));
          n = Number.isNaN(n) ? 1 : n;
          var e = (r.x1 - r.x0) * n,
            i = (r.y1 - r.y0) * n;
          return { x: r.x0 + e, y: r.y0 + i };
        }),
        t(this, "getTangentAtLength", function (t) {
          var n = Math.sqrt(
            (r.x1 - r.x0) * (r.x1 - r.x0) + (r.y1 - r.y0) * (r.y1 - r.y0)
          );
          return { x: (r.x1 - r.x0) / n, y: (r.y1 - r.y0) / n };
        }),
        t(this, "getPropertiesAtLength", function (t) {
          var n = r.getPointAtLength(t),
            e = r.getTangentAtLength(t);
          return { x: n.x, y: n.y, tangentX: e.x, tangentY: e.y };
        }),
        (this.x0 = n),
        (this.x1 = e),
        (this.y0 = i),
        (this.y1 = h);
    },
    o = function (n, e, i, h, r, s, a, o, l) {
      var c = this;
      t(this, "x0", void 0),
        t(this, "y0", void 0),
        t(this, "rx", void 0),
        t(this, "ry", void 0),
        t(this, "xAxisRotate", void 0),
        t(this, "LargeArcFlag", void 0),
        t(this, "SweepFlag", void 0),
        t(this, "x1", void 0),
        t(this, "y1", void 0),
        t(this, "length", void 0),
        t(this, "getTotalLength", function () {
          return c.length;
        }),
        t(this, "getPointAtLength", function (t) {
          t < 0 ? (t = 0) : t > c.length && (t = c.length);
          var n = g(
            { x: c.x0, y: c.y0 },
            c.rx,
            c.ry,
            c.xAxisRotate,
            c.LargeArcFlag,
            c.SweepFlag,
            { x: c.x1, y: c.y1 },
            t / c.length
          );
          return { x: n.x, y: n.y };
        }),
        t(this, "getTangentAtLength", function (t) {
          t < 0 ? (t = 0) : t > c.length && (t = c.length);
          var n,
            e = 0.05,
            i = c.getPointAtLength(t);
          t < 0 ? (t = 0) : t > c.length && (t = c.length);
          var h =
              (n =
                t < c.length - e
                  ? c.getPointAtLength(t + e)
                  : c.getPointAtLength(t - e)).x - i.x,
            r = n.y - i.y,
            s = Math.sqrt(h * h + r * r);
          return t < c.length - e
            ? { x: -h / s, y: -r / s }
            : { x: h / s, y: r / s };
        }),
        t(this, "getPropertiesAtLength", function (t) {
          var n = c.getTangentAtLength(t),
            e = c.getPointAtLength(t);
          return { x: e.x, y: e.y, tangentX: n.x, tangentY: n.y };
        }),
        (this.x0 = n),
        (this.y0 = e),
        (this.rx = i),
        (this.ry = h),
        (this.xAxisRotate = r),
        (this.LargeArcFlag = s),
        (this.SweepFlag = a),
        (this.x1 = o),
        (this.y1 = l);
      var f = u(300, function (t) {
        return g({ x: n, y: e }, i, h, r, s, a, { x: o, y: l }, t);
      });
      this.length = f.arcLength;
    },
    g = function (t, n, e, i, h, r, s, a) {
      (n = Math.abs(n)), (e = Math.abs(e)), (i = l(i, 360));
      var o = c(i);
      if (t.x === s.x && t.y === s.y)
        return { x: t.x, y: t.y, ellipticalArcAngle: 0 };
      if (0 === n || 0 === e) return { x: 0, y: 0, ellipticalArcAngle: 0 };
      var g = (t.x - s.x) / 2,
        u = (t.y - s.y) / 2,
        f = {
          x: Math.cos(o) * g + Math.sin(o) * u,
          y: -Math.sin(o) * g + Math.cos(o) * u,
        },
        y =
          Math.pow(f.x, 2) / Math.pow(n, 2) + Math.pow(f.y, 2) / Math.pow(e, 2);
      y > 1 && ((n = Math.sqrt(y) * n), (e = Math.sqrt(y) * e));
      var p =
        (Math.pow(n, 2) * Math.pow(e, 2) -
          Math.pow(n, 2) * Math.pow(f.y, 2) -
          Math.pow(e, 2) * Math.pow(f.x, 2)) /
        (Math.pow(n, 2) * Math.pow(f.y, 2) + Math.pow(e, 2) * Math.pow(f.x, 2));
      p = p < 0 ? 0 : p;
      var v = (h !== r ? 1 : -1) * Math.sqrt(p),
        M = v * ((n * f.y) / e),
        L = v * ((-e * f.x) / n),
        w = {
          x: Math.cos(o) * M - Math.sin(o) * L + (t.x + s.x) / 2,
          y: Math.sin(o) * M + Math.cos(o) * L + (t.y + s.y) / 2,
        },
        A = { x: (f.x - M) / n, y: (f.y - L) / e },
        d = x({ x: 1, y: 0 }, A),
        P = x(A, { x: (-f.x - M) / n, y: (-f.y - L) / e });
      !r && P > 0 ? (P -= 2 * Math.PI) : r && P < 0 && (P += 2 * Math.PI);
      var b = d + (P %= 2 * Math.PI) * a,
        T = n * Math.cos(b),
        m = e * Math.sin(b);
      return {
        x: Math.cos(o) * T - Math.sin(o) * m + w.x,
        y: Math.sin(o) * T + Math.cos(o) * m + w.y,
        ellipticalArcStartAngle: d,
        ellipticalArcEndAngle: d + P,
        ellipticalArcAngle: b,
        ellipticalArcCenter: w,
        resultantRx: n,
        resultantRy: e,
      };
    },
    u = function (t, n) {
      t = t || 500;
      for (var e, i = 0, h = [], r = [], s = n(0), a = 0; a < t; a++) {
        var o = y(a * (1 / t), 0, 1);
        (e = n(o)),
          (i += f(s, e)),
          r.push([s, e]),
          h.push({ t: o, arcLength: i }),
          (s = e);
      }
      return (
        (e = n(1)),
        r.push([s, e]),
        (i += f(s, e)),
        h.push({ t: 1, arcLength: i }),
        { arcLength: i, arcLengthMap: h, approximationLines: r }
      );
    },
    l = function (t, n) {
      return ((t % n) + n) % n;
    },
    c = function (t) {
      return t * (Math.PI / 180);
    },
    f = function (t, n) {
      return Math.sqrt(Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2));
    },
    y = function (t, n, e) {
      return Math.min(Math.max(t, n), e);
    },
    x = function (t, n) {
      var e = t.x * n.x + t.y * n.y,
        i = Math.sqrt(
          (Math.pow(t.x, 2) + Math.pow(t.y, 2)) *
            (Math.pow(n.x, 2) + Math.pow(n.y, 2))
        );
      return (t.x * n.y - t.y * n.x < 0 ? -1 : 1) * Math.acos(e / i);
    },
    p = [
      [],
      [],
      [-0.5773502691896257, 0.5773502691896257],
      [0, -0.7745966692414834, 0.7745966692414834],
      [
        -0.33998104358485626, 0.33998104358485626, -0.8611363115940526,
        0.8611363115940526,
      ],
      [
        0, -0.5384693101056831, 0.5384693101056831, -0.906179845938664,
        0.906179845938664,
      ],
      [
        0.6612093864662645, -0.6612093864662645, -0.2386191860831969,
        0.2386191860831969, -0.932469514203152, 0.932469514203152,
      ],
      [
        0, 0.4058451513773972, -0.4058451513773972, -0.7415311855993945,
        0.7415311855993945, -0.9491079123427585, 0.9491079123427585,
      ],
      [
        -0.1834346424956498, 0.1834346424956498, -0.525532409916329,
        0.525532409916329, -0.7966664774136267, 0.7966664774136267,
        -0.9602898564975363, 0.9602898564975363,
      ],
      [
        0, -0.8360311073266358, 0.8360311073266358, -0.9681602395076261,
        0.9681602395076261, -0.3242534234038089, 0.3242534234038089,
        -0.6133714327005904, 0.6133714327005904,
      ],
      [
        -0.14887433898163122, 0.14887433898163122, -0.4333953941292472,
        0.4333953941292472, -0.6794095682990244, 0.6794095682990244,
        -0.8650633666889845, 0.8650633666889845, -0.9739065285171717,
        0.9739065285171717,
      ],
      [
        0, -0.26954315595234496, 0.26954315595234496, -0.5190961292068118,
        0.5190961292068118, -0.7301520055740494, 0.7301520055740494,
        -0.8870625997680953, 0.8870625997680953, -0.978228658146057,
        0.978228658146057,
      ],
      [
        -0.1252334085114689, 0.1252334085114689, -0.3678314989981802,
        0.3678314989981802, -0.5873179542866175, 0.5873179542866175,
        -0.7699026741943047, 0.7699026741943047, -0.9041172563704749,
        0.9041172563704749, -0.9815606342467192, 0.9815606342467192,
      ],
      [
        0, -0.2304583159551348, 0.2304583159551348, -0.44849275103644687,
        0.44849275103644687, -0.6423493394403402, 0.6423493394403402,
        -0.8015780907333099, 0.8015780907333099, -0.9175983992229779,
        0.9175983992229779, -0.9841830547185881, 0.9841830547185881,
      ],
      [
        -0.10805494870734367, 0.10805494870734367, -0.31911236892788974,
        0.31911236892788974, -0.5152486363581541, 0.5152486363581541,
        -0.6872929048116855, 0.6872929048116855, -0.827201315069765,
        0.827201315069765, -0.9284348836635735, 0.9284348836635735,
        -0.9862838086968123, 0.9862838086968123,
      ],
      [
        0, -0.20119409399743451, 0.20119409399743451, -0.3941513470775634,
        0.3941513470775634, -0.5709721726085388, 0.5709721726085388,
        -0.7244177313601701, 0.7244177313601701, -0.8482065834104272,
        0.8482065834104272, -0.937273392400706, 0.937273392400706,
        -0.9879925180204854, 0.9879925180204854,
      ],
      [
        -0.09501250983763744, 0.09501250983763744, -0.2816035507792589,
        0.2816035507792589, -0.45801677765722737, 0.45801677765722737,
        -0.6178762444026438, 0.6178762444026438, -0.755404408355003,
        0.755404408355003, -0.8656312023878318, 0.8656312023878318,
        -0.9445750230732326, 0.9445750230732326, -0.9894009349916499,
        0.9894009349916499,
      ],
      [
        0, -0.17848418149584785, 0.17848418149584785, -0.3512317634538763,
        0.3512317634538763, -0.5126905370864769, 0.5126905370864769,
        -0.6576711592166907, 0.6576711592166907, -0.7815140038968014,
        0.7815140038968014, -0.8802391537269859, 0.8802391537269859,
        -0.9506755217687678, 0.9506755217687678, -0.9905754753144174,
        0.9905754753144174,
      ],
      [
        -0.0847750130417353, 0.0847750130417353, -0.2518862256915055,
        0.2518862256915055, -0.41175116146284263, 0.41175116146284263,
        -0.5597708310739475, 0.5597708310739475, -0.6916870430603532,
        0.6916870430603532, -0.8037049589725231, 0.8037049589725231,
        -0.8926024664975557, 0.8926024664975557, -0.9558239495713977,
        0.9558239495713977, -0.9915651684209309, 0.9915651684209309,
      ],
      [
        0, -0.16035864564022537, 0.16035864564022537, -0.31656409996362983,
        0.31656409996362983, -0.46457074137596094, 0.46457074137596094,
        -0.600545304661681, 0.600545304661681, -0.7209661773352294,
        0.7209661773352294, -0.8227146565371428, 0.8227146565371428,
        -0.9031559036148179, 0.9031559036148179, -0.96020815213483,
        0.96020815213483, -0.9924068438435844, 0.9924068438435844,
      ],
      [
        -0.07652652113349734, 0.07652652113349734, -0.22778585114164507,
        0.22778585114164507, -0.37370608871541955, 0.37370608871541955,
        -0.5108670019508271, 0.5108670019508271, -0.636053680726515,
        0.636053680726515, -0.7463319064601508, 0.7463319064601508,
        -0.8391169718222188, 0.8391169718222188, -0.912234428251326,
        0.912234428251326, -0.9639719272779138, 0.9639719272779138,
        -0.9931285991850949, 0.9931285991850949,
      ],
      [
        0, -0.1455618541608951, 0.1455618541608951, -0.2880213168024011,
        0.2880213168024011, -0.4243421202074388, 0.4243421202074388,
        -0.5516188358872198, 0.5516188358872198, -0.6671388041974123,
        0.6671388041974123, -0.7684399634756779, 0.7684399634756779,
        -0.8533633645833173, 0.8533633645833173, -0.9200993341504008,
        0.9200993341504008, -0.9672268385663063, 0.9672268385663063,
        -0.9937521706203895, 0.9937521706203895,
      ],
      [
        -0.06973927331972223, 0.06973927331972223, -0.20786042668822127,
        0.20786042668822127, -0.34193582089208424, 0.34193582089208424,
        -0.469355837986757, 0.469355837986757, -0.5876404035069116,
        0.5876404035069116, -0.6944872631866827, 0.6944872631866827,
        -0.7878168059792081, 0.7878168059792081, -0.8658125777203002,
        0.8658125777203002, -0.926956772187174, 0.926956772187174,
        -0.9700604978354287, 0.9700604978354287, -0.9942945854823992,
        0.9942945854823992,
      ],
      [
        0, -0.1332568242984661, 0.1332568242984661, -0.26413568097034495,
        0.26413568097034495, -0.3903010380302908, 0.3903010380302908,
        -0.5095014778460075, 0.5095014778460075, -0.6196098757636461,
        0.6196098757636461, -0.7186613631319502, 0.7186613631319502,
        -0.8048884016188399, 0.8048884016188399, -0.8767523582704416,
        0.8767523582704416, -0.9329710868260161, 0.9329710868260161,
        -0.9725424712181152, 0.9725424712181152, -0.9947693349975522,
        0.9947693349975522,
      ],
      [
        -0.06405689286260563, 0.06405689286260563, -0.1911188674736163,
        0.1911188674736163, -0.3150426796961634, 0.3150426796961634,
        -0.4337935076260451, 0.4337935076260451, -0.5454214713888396,
        0.5454214713888396, -0.6480936519369755, 0.6480936519369755,
        -0.7401241915785544, 0.7401241915785544, -0.820001985973903,
        0.820001985973903, -0.8864155270044011, 0.8864155270044011,
        -0.9382745520027328, 0.9382745520027328, -0.9747285559713095,
        0.9747285559713095, -0.9951872199970213, 0.9951872199970213,
      ],
    ],
    v = [
      [],
      [],
      [1, 1],
      [0.8888888888888888, 0.5555555555555556, 0.5555555555555556],
      [
        0.6521451548625461, 0.6521451548625461, 0.34785484513745385,
        0.34785484513745385,
      ],
      [
        0.5688888888888889, 0.47862867049936647, 0.47862867049936647,
        0.23692688505618908, 0.23692688505618908,
      ],
      [
        0.3607615730481386, 0.3607615730481386, 0.46791393457269104,
        0.46791393457269104, 0.17132449237917036, 0.17132449237917036,
      ],
      [
        0.4179591836734694, 0.3818300505051189, 0.3818300505051189,
        0.27970539148927664, 0.27970539148927664, 0.1294849661688697,
        0.1294849661688697,
      ],
      [
        0.362683783378362, 0.362683783378362, 0.31370664587788727,
        0.31370664587788727, 0.22238103445337448, 0.22238103445337448,
        0.10122853629037626, 0.10122853629037626,
      ],
      [
        0.3302393550012598, 0.1806481606948574, 0.1806481606948574,
        0.08127438836157441, 0.08127438836157441, 0.31234707704000286,
        0.31234707704000286, 0.26061069640293544, 0.26061069640293544,
      ],
      [
        0.29552422471475287, 0.29552422471475287, 0.26926671930999635,
        0.26926671930999635, 0.21908636251598204, 0.21908636251598204,
        0.1494513491505806, 0.1494513491505806, 0.06667134430868814,
        0.06667134430868814,
      ],
      [
        0.2729250867779006, 0.26280454451024665, 0.26280454451024665,
        0.23319376459199048, 0.23319376459199048, 0.18629021092773426,
        0.18629021092773426, 0.1255803694649046, 0.1255803694649046,
        0.05566856711617366, 0.05566856711617366,
      ],
      [
        0.24914704581340277, 0.24914704581340277, 0.2334925365383548,
        0.2334925365383548, 0.20316742672306592, 0.20316742672306592,
        0.16007832854334622, 0.16007832854334622, 0.10693932599531843,
        0.10693932599531843, 0.04717533638651183, 0.04717533638651183,
      ],
      [
        0.2325515532308739, 0.22628318026289723, 0.22628318026289723,
        0.2078160475368885, 0.2078160475368885, 0.17814598076194574,
        0.17814598076194574, 0.13887351021978725, 0.13887351021978725,
        0.09212149983772845, 0.09212149983772845, 0.04048400476531588,
        0.04048400476531588,
      ],
      [
        0.2152638534631578, 0.2152638534631578, 0.2051984637212956,
        0.2051984637212956, 0.18553839747793782, 0.18553839747793782,
        0.15720316715819355, 0.15720316715819355, 0.12151857068790319,
        0.12151857068790319, 0.08015808715976021, 0.08015808715976021,
        0.03511946033175186, 0.03511946033175186,
      ],
      [
        0.2025782419255613, 0.19843148532711158, 0.19843148532711158,
        0.1861610000155622, 0.1861610000155622, 0.16626920581699392,
        0.16626920581699392, 0.13957067792615432, 0.13957067792615432,
        0.10715922046717194, 0.10715922046717194, 0.07036604748810812,
        0.07036604748810812, 0.03075324199611727, 0.03075324199611727,
      ],
      [
        0.1894506104550685, 0.1894506104550685, 0.18260341504492358,
        0.18260341504492358, 0.16915651939500254, 0.16915651939500254,
        0.14959598881657674, 0.14959598881657674, 0.12462897125553388,
        0.12462897125553388, 0.09515851168249279, 0.09515851168249279,
        0.062253523938647894, 0.062253523938647894, 0.027152459411754096,
        0.027152459411754096,
      ],
      [
        0.17944647035620653, 0.17656270536699264, 0.17656270536699264,
        0.16800410215645004, 0.16800410215645004, 0.15404576107681028,
        0.15404576107681028, 0.13513636846852548, 0.13513636846852548,
        0.11188384719340397, 0.11188384719340397, 0.08503614831717918,
        0.08503614831717918, 0.0554595293739872, 0.0554595293739872,
        0.02414830286854793, 0.02414830286854793,
      ],
      [
        0.1691423829631436, 0.1691423829631436, 0.16427648374583273,
        0.16427648374583273, 0.15468467512626524, 0.15468467512626524,
        0.14064291467065065, 0.14064291467065065, 0.12255520671147846,
        0.12255520671147846, 0.10094204410628717, 0.10094204410628717,
        0.07642573025488905, 0.07642573025488905, 0.0497145488949698,
        0.0497145488949698, 0.02161601352648331, 0.02161601352648331,
      ],
      [
        0.1610544498487837, 0.15896884339395434, 0.15896884339395434,
        0.15276604206585967, 0.15276604206585967, 0.1426067021736066,
        0.1426067021736066, 0.12875396253933621, 0.12875396253933621,
        0.11156664554733399, 0.11156664554733399, 0.09149002162245,
        0.09149002162245, 0.06904454273764123, 0.06904454273764123,
        0.0448142267656996, 0.0448142267656996, 0.019461788229726478,
        0.019461788229726478,
      ],
      [
        0.15275338713072584, 0.15275338713072584, 0.14917298647260374,
        0.14917298647260374, 0.14209610931838204, 0.14209610931838204,
        0.13168863844917664, 0.13168863844917664, 0.11819453196151841,
        0.11819453196151841, 0.10193011981724044, 0.10193011981724044,
        0.08327674157670475, 0.08327674157670475, 0.06267204833410907,
        0.06267204833410907, 0.04060142980038694, 0.04060142980038694,
        0.017614007139152118, 0.017614007139152118,
      ],
      [
        0.14608113364969041, 0.14452440398997005, 0.14452440398997005,
        0.13988739479107315, 0.13988739479107315, 0.13226893863333747,
        0.13226893863333747, 0.12183141605372853, 0.12183141605372853,
        0.10879729916714838, 0.10879729916714838, 0.09344442345603386,
        0.09344442345603386, 0.0761001136283793, 0.0761001136283793,
        0.057134425426857205, 0.057134425426857205, 0.036953789770852494,
        0.036953789770852494, 0.016017228257774335, 0.016017228257774335,
      ],
      [
        0.13925187285563198, 0.13925187285563198, 0.13654149834601517,
        0.13654149834601517, 0.13117350478706238, 0.13117350478706238,
        0.12325237681051242, 0.12325237681051242, 0.11293229608053922,
        0.11293229608053922, 0.10041414444288096, 0.10041414444288096,
        0.08594160621706773, 0.08594160621706773, 0.06979646842452049,
        0.06979646842452049, 0.052293335152683286, 0.052293335152683286,
        0.03377490158481415, 0.03377490158481415, 0.0146279952982722,
        0.0146279952982722,
      ],
      [
        0.13365457218610619, 0.1324620394046966, 0.1324620394046966,
        0.12890572218808216, 0.12890572218808216, 0.12304908430672953,
        0.12304908430672953, 0.11499664022241136, 0.11499664022241136,
        0.10489209146454141, 0.10489209146454141, 0.09291576606003515,
        0.09291576606003515, 0.07928141177671895, 0.07928141177671895,
        0.06423242140852585, 0.06423242140852585, 0.04803767173108467,
        0.04803767173108467, 0.030988005856979445, 0.030988005856979445,
        0.013411859487141771, 0.013411859487141771,
      ],
      [
        0.12793819534675216, 0.12793819534675216, 0.1258374563468283,
        0.1258374563468283, 0.12167047292780339, 0.12167047292780339,
        0.1155056680537256, 0.1155056680537256, 0.10744427011596563,
        0.10744427011596563, 0.09761865210411388, 0.09761865210411388,
        0.08619016153195327, 0.08619016153195327, 0.0733464814110803,
        0.0733464814110803, 0.05929858491543678, 0.05929858491543678,
        0.04427743881741981, 0.04427743881741981, 0.028531388628933663,
        0.028531388628933663, 0.0123412297999872, 0.0123412297999872,
      ],
    ],
    M = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]],
    L = function (t, n, e) {
      return {
        x:
          (1 - e) * (1 - e) * (1 - e) * t[0] +
          3 * (1 - e) * (1 - e) * e * t[1] +
          3 * (1 - e) * e * e * t[2] +
          e * e * e * t[3],
        y:
          (1 - e) * (1 - e) * (1 - e) * n[0] +
          3 * (1 - e) * (1 - e) * e * n[1] +
          3 * (1 - e) * e * e * n[2] +
          e * e * e * n[3],
      };
    },
    w = function (t, n, e) {
      return d(
        [3 * (t[1] - t[0]), 3 * (t[2] - t[1]), 3 * (t[3] - t[2])],
        [3 * (n[1] - n[0]), 3 * (n[2] - n[1]), 3 * (n[3] - n[2])],
        e
      );
    },
    A = function (t, n, e) {
      var i, h, r;
      (i = e / 2), (h = 0);
      for (var s = 0; s < 20; s++)
        (r = i * p[20][s] + i), (h += v[20][s] * T(t, n, r));
      return i * h;
    },
    d = function (t, n, e) {
      return {
        x: (1 - e) * (1 - e) * t[0] + 2 * (1 - e) * e * t[1] + e * e * t[2],
        y: (1 - e) * (1 - e) * n[0] + 2 * (1 - e) * e * n[1] + e * e * n[2],
      };
    },
    P = function (t, n, e) {
      void 0 === e && (e = 1);
      var i = t[0] - 2 * t[1] + t[2],
        h = n[0] - 2 * n[1] + n[2],
        r = 2 * t[1] - 2 * t[0],
        s = 2 * n[1] - 2 * n[0],
        a = 4 * (i * i + h * h),
        o = 4 * (i * r + h * s),
        g = r * r + s * s;
      if (0 === a)
        return (
          e * Math.sqrt(Math.pow(t[2] - t[0], 2) + Math.pow(n[2] - n[0], 2))
        );
      var u = o / (2 * a),
        l = e + u,
        c = g / a - u * u,
        f = l * l + c > 0 ? Math.sqrt(l * l + c) : 0,
        y = u * u + c > 0 ? Math.sqrt(u * u + c) : 0,
        x =
          u + Math.sqrt(u * u + c) !== 0
            ? c * Math.log(Math.abs((l + f) / (u + y)))
            : 0;
      return (Math.sqrt(a) / 2) * (l * f - u * y + x);
    },
    b = function (t, n, e) {
      return {
        x: 2 * (1 - e) * (t[1] - t[0]) + 2 * e * (t[2] - t[1]),
        y: 2 * (1 - e) * (n[1] - n[0]) + 2 * e * (n[2] - n[1]),
      };
    };
  function T(t, n, e) {
    var i = m(1, e, t),
      h = m(1, e, n),
      r = i * i + h * h;
    return Math.sqrt(r);
  }
  var m = function t(n, e, i) {
      var h,
        r,
        s = i.length - 1;
      if (0 === s) return 0;
      if (0 === n) {
        r = 0;
        for (var a = 0; a <= s; a++)
          r += M[s][a] * Math.pow(1 - e, s - a) * Math.pow(e, a) * i[a];
        return r;
      }
      h = new Array(s);
      for (var o = 0; o < s; o++) h[o] = s * (i[o + 1] - i[o]);
      return t(n - 1, e, h);
    },
    q = function (t, n, e) {
      for (var i = 1, h = t / n, r = (t - e(h)) / n, s = 0; i > 0.001; ) {
        var a = e(h + r),
          o = Math.abs(t - a) / n;
        if (o < i) (i = o), (h += r);
        else {
          var g = e(h - r),
            u = Math.abs(t - g) / n;
          u < i ? ((i = u), (h -= r)) : (r /= 2);
        }
        if (++s > 500) break;
      }
      return h;
    },
    _ = function (n, e, i, h, r, s, a, o) {
      var g = this;
      t(this, "a", void 0),
        t(this, "b", void 0),
        t(this, "c", void 0),
        t(this, "d", void 0),
        t(this, "length", void 0),
        t(this, "getArcLength", void 0),
        t(this, "getPoint", void 0),
        t(this, "getDerivative", void 0),
        t(this, "getTotalLength", function () {
          return g.length;
        }),
        t(this, "getPointAtLength", function (t) {
          var n = [g.a.x, g.b.x, g.c.x, g.d.x],
            e = [g.a.y, g.b.y, g.c.y, g.d.y],
            i = q(t, g.length, function (t) {
              return g.getArcLength(n, e, t);
            });
          return g.getPoint(n, e, i);
        }),
        t(this, "getTangentAtLength", function (t) {
          var n = [g.a.x, g.b.x, g.c.x, g.d.x],
            e = [g.a.y, g.b.y, g.c.y, g.d.y],
            i = q(t, g.length, function (t) {
              return g.getArcLength(n, e, t);
            }),
            h = g.getDerivative(n, e, i),
            r = Math.sqrt(h.x * h.x + h.y * h.y);
          return r > 0 ? { x: h.x / r, y: h.y / r } : { x: 0, y: 0 };
        }),
        t(this, "getPropertiesAtLength", function (t) {
          var n,
            e = [g.a.x, g.b.x, g.c.x, g.d.x],
            i = [g.a.y, g.b.y, g.c.y, g.d.y],
            h = q(t, g.length, function (t) {
              return g.getArcLength(e, i, t);
            }),
            r = g.getDerivative(e, i, h),
            s = Math.sqrt(r.x * r.x + r.y * r.y);
          n = s > 0 ? { x: r.x / s, y: r.y / s } : { x: 0, y: 0 };
          var a = g.getPoint(e, i, h);
          return { x: a.x, y: a.y, tangentX: n.x, tangentY: n.y };
        }),
        t(this, "getC", function () {
          return g.c;
        }),
        t(this, "getD", function () {
          return g.d;
        }),
        (this.a = { x: n, y: e }),
        (this.b = { x: i, y: h }),
        (this.c = { x: r, y: s }),
        void 0 !== a && void 0 !== o
          ? ((this.getArcLength = A),
            (this.getPoint = L),
            (this.getDerivative = w),
            (this.d = { x: a, y: o }))
          : ((this.getArcLength = P),
            (this.getPoint = d),
            (this.getDerivative = b),
            (this.d = { x: 0, y: 0 })),
        (this.length = this.getArcLength(
          [this.a.x, this.b.x, this.c.x, this.d.x],
          [this.a.y, this.b.y, this.c.y, this.d.y],
          1
        ));
    },
    S = function (e) {
      var r = this;
      t(this, "length", 0),
        t(this, "partial_lengths", []),
        t(this, "functions", []),
        t(this, "initial_point", null),
        t(this, "getPartAtLength", function (t) {
          t < 0 ? (t = 0) : t > r.length && (t = r.length);
          for (
            var n = r.partial_lengths.length - 1;
            r.partial_lengths[n] >= t && n > 0;

          )
            n--;
          return n++, { fraction: t - r.partial_lengths[n - 1], i: n };
        }),
        t(this, "getTotalLength", function () {
          return r.length;
        }),
        t(this, "getPointAtLength", function (t) {
          var n = r.getPartAtLength(t),
            e = r.functions[n.i];
          if (e) return e.getPointAtLength(n.fraction);
          if (r.initial_point) return r.initial_point;
          throw new Error("Wrong function at this part.");
        }),
        t(this, "getTangentAtLength", function (t) {
          var n = r.getPartAtLength(t),
            e = r.functions[n.i];
          if (e) return e.getTangentAtLength(n.fraction);
          if (r.initial_point) return { x: 0, y: 0 };
          throw new Error("Wrong function at this part.");
        }),
        t(this, "getPropertiesAtLength", function (t) {
          var n = r.getPartAtLength(t),
            e = r.functions[n.i];
          if (e) return e.getPropertiesAtLength(n.fraction);
          if (r.initial_point)
            return {
              x: r.initial_point.x,
              y: r.initial_point.y,
              tangentX: 0,
              tangentY: 0,
            };
          throw new Error("Wrong function at this part.");
        }),
        t(this, "getParts", function () {
          for (var t = [], n = 0; n < r.functions.length; n++)
            if (null !== r.functions[n]) {
              r.functions[n] = r.functions[n];
              var e = {
                start: r.functions[n].getPointAtLength(0),
                end: r.functions[n].getPointAtLength(
                  r.partial_lengths[n] - r.partial_lengths[n - 1]
                ),
                length: r.partial_lengths[n] - r.partial_lengths[n - 1],
                getPointAtLength: r.functions[n].getPointAtLength,
                getTangentAtLength: r.functions[n].getTangentAtLength,
                getPropertiesAtLength: r.functions[n].getPropertiesAtLength,
              };
              t.push(e);
            }
          return t;
        });
      for (
        var g,
          u = (function (t) {
            var e = (t && t.length > 0 ? t : "M0,0").match(h);
            if (!e)
              throw new Error("No path elements found in string ".concat(t));
            return e.reduce(function (t, e) {
              var h = e.charAt(0),
                r = h.toLowerCase(),
                a = s(e.substr(1));
              for (
                "m" === r &&
                a.length > 2 &&
                (t.push([h].concat(n(a.splice(0, 2)))),
                (r = "l"),
                (h = "m" === h ? "l" : "L"));
                a.length >= 0;

              ) {
                if (a.length === i[r]) {
                  t.push([h].concat(n(a.splice(0, i[r]))));
                  break;
                }
                if (a.length < i[r])
                  throw new Error(
                    'Malformed path data: "'
                      .concat(h, '" must have ')
                      .concat(i[r], " elements and has ")
                      .concat(a.length, ": ")
                      .concat(e)
                  );
                t.push([h].concat(n(a.splice(0, i[r]))));
              }
              return t;
            }, []);
          })(e),
          l = [0, 0],
          c = [0, 0],
          f = [0, 0],
          y = 0;
        y < u.length;
        y++
      ) {
        if ("M" === u[y][0])
          (f = [(l = [u[y][1], u[y][2]])[0], l[1]]),
            this.functions.push(null),
            0 === y && (this.initial_point = { x: u[y][1], y: u[y][2] });
        else if ("m" === u[y][0])
          (f = [(l = [u[y][1] + l[0], u[y][2] + l[1]])[0], l[1]]),
            this.functions.push(null);
        else if ("L" === u[y][0])
          (this.length += Math.sqrt(
            Math.pow(l[0] - u[y][1], 2) + Math.pow(l[1] - u[y][2], 2)
          )),
            this.functions.push(new a(l[0], u[y][1], l[1], u[y][2])),
            (l = [u[y][1], u[y][2]]);
        else if ("l" === u[y][0])
          (this.length += Math.sqrt(
            Math.pow(u[y][1], 2) + Math.pow(u[y][2], 2)
          )),
            this.functions.push(
              new a(l[0], u[y][1] + l[0], l[1], u[y][2] + l[1])
            ),
            (l = [u[y][1] + l[0], u[y][2] + l[1]]);
        else if ("H" === u[y][0])
          (this.length += Math.abs(l[0] - u[y][1])),
            this.functions.push(new a(l[0], u[y][1], l[1], l[1])),
            (l[0] = u[y][1]);
        else if ("h" === u[y][0])
          (this.length += Math.abs(u[y][1])),
            this.functions.push(new a(l[0], l[0] + u[y][1], l[1], l[1])),
            (l[0] = u[y][1] + l[0]);
        else if ("V" === u[y][0])
          (this.length += Math.abs(l[1] - u[y][1])),
            this.functions.push(new a(l[0], l[0], l[1], u[y][1])),
            (l[1] = u[y][1]);
        else if ("v" === u[y][0])
          (this.length += Math.abs(u[y][1])),
            this.functions.push(new a(l[0], l[0], l[1], l[1] + u[y][1])),
            (l[1] = u[y][1] + l[1]);
        else if ("z" === u[y][0] || "Z" === u[y][0])
          (this.length += Math.sqrt(
            Math.pow(f[0] - l[0], 2) + Math.pow(f[1] - l[1], 2)
          )),
            this.functions.push(new a(l[0], f[0], l[1], f[1])),
            (l = [f[0], f[1]]);
        else if ("C" === u[y][0])
          (g = new _(
            l[0],
            l[1],
            u[y][1],
            u[y][2],
            u[y][3],
            u[y][4],
            u[y][5],
            u[y][6]
          )),
            (this.length += g.getTotalLength()),
            (l = [u[y][5], u[y][6]]),
            this.functions.push(g);
        else if ("c" === u[y][0])
          (g = new _(
            l[0],
            l[1],
            l[0] + u[y][1],
            l[1] + u[y][2],
            l[0] + u[y][3],
            l[1] + u[y][4],
            l[0] + u[y][5],
            l[1] + u[y][6]
          )).getTotalLength() > 0
            ? ((this.length += g.getTotalLength()),
              this.functions.push(g),
              (l = [u[y][5] + l[0], u[y][6] + l[1]]))
            : this.functions.push(new a(l[0], l[0], l[1], l[1]));
        else if ("S" === u[y][0]) {
          if (y > 0 && ["C", "c", "S", "s"].indexOf(u[y - 1][0]) > -1) {
            if (g) {
              var x = g.getC();
              g = new _(
                l[0],
                l[1],
                2 * l[0] - x.x,
                2 * l[1] - x.y,
                u[y][1],
                u[y][2],
                u[y][3],
                u[y][4]
              );
            }
          } else
            g = new _(
              l[0],
              l[1],
              l[0],
              l[1],
              u[y][1],
              u[y][2],
              u[y][3],
              u[y][4]
            );
          g &&
            ((this.length += g.getTotalLength()),
            (l = [u[y][3], u[y][4]]),
            this.functions.push(g));
        } else if ("s" === u[y][0]) {
          if (y > 0 && ["C", "c", "S", "s"].indexOf(u[y - 1][0]) > -1) {
            if (g) {
              var p = g.getC(),
                v = g.getD();
              g = new _(
                l[0],
                l[1],
                l[0] + v.x - p.x,
                l[1] + v.y - p.y,
                l[0] + u[y][1],
                l[1] + u[y][2],
                l[0] + u[y][3],
                l[1] + u[y][4]
              );
            }
          } else
            g = new _(
              l[0],
              l[1],
              l[0],
              l[1],
              l[0] + u[y][1],
              l[1] + u[y][2],
              l[0] + u[y][3],
              l[1] + u[y][4]
            );
          g &&
            ((this.length += g.getTotalLength()),
            (l = [u[y][3] + l[0], u[y][4] + l[1]]),
            this.functions.push(g));
        } else if ("Q" === u[y][0]) {
          if (l[0] == u[y][1] && l[1] == u[y][2]) {
            var M = new a(u[y][1], u[y][3], u[y][2], u[y][4]);
            (this.length += M.getTotalLength()), this.functions.push(M);
          } else
            (g = new _(
              l[0],
              l[1],
              u[y][1],
              u[y][2],
              u[y][3],
              u[y][4],
              void 0,
              void 0
            )),
              (this.length += g.getTotalLength()),
              this.functions.push(g);
          (l = [u[y][3], u[y][4]]), (c = [u[y][1], u[y][2]]);
        } else if ("q" === u[y][0]) {
          if (0 != u[y][1] || 0 != u[y][2])
            (g = new _(
              l[0],
              l[1],
              l[0] + u[y][1],
              l[1] + u[y][2],
              l[0] + u[y][3],
              l[1] + u[y][4],
              void 0,
              void 0
            )),
              (this.length += g.getTotalLength()),
              this.functions.push(g);
          else {
            var L = new a(
              l[0] + u[y][1],
              l[0] + u[y][3],
              l[1] + u[y][2],
              l[1] + u[y][4]
            );
            (this.length += L.getTotalLength()), this.functions.push(L);
          }
          (c = [l[0] + u[y][1], l[1] + u[y][2]]),
            (l = [u[y][3] + l[0], u[y][4] + l[1]]);
        } else if ("T" === u[y][0]) {
          if (y > 0 && ["Q", "q", "T", "t"].indexOf(u[y - 1][0]) > -1)
            (g = new _(
              l[0],
              l[1],
              2 * l[0] - c[0],
              2 * l[1] - c[1],
              u[y][1],
              u[y][2],
              void 0,
              void 0
            )),
              this.functions.push(g),
              (this.length += g.getTotalLength());
          else {
            var w = new a(l[0], u[y][1], l[1], u[y][2]);
            this.functions.push(w), (this.length += w.getTotalLength());
          }
          (c = [2 * l[0] - c[0], 2 * l[1] - c[1]]), (l = [u[y][1], u[y][2]]);
        } else if ("t" === u[y][0]) {
          if (y > 0 && ["Q", "q", "T", "t"].indexOf(u[y - 1][0]) > -1)
            (g = new _(
              l[0],
              l[1],
              2 * l[0] - c[0],
              2 * l[1] - c[1],
              l[0] + u[y][1],
              l[1] + u[y][2],
              void 0,
              void 0
            )),
              (this.length += g.getTotalLength()),
              this.functions.push(g);
          else {
            var A = new a(l[0], l[0] + u[y][1], l[1], l[1] + u[y][2]);
            (this.length += A.getTotalLength()), this.functions.push(A);
          }
          (c = [2 * l[0] - c[0], 2 * l[1] - c[1]]),
            (l = [u[y][1] + l[0], u[y][2] + l[0]]);
        } else if ("A" === u[y][0]) {
          var d = new o(
            l[0],
            l[1],
            u[y][1],
            u[y][2],
            u[y][3],
            1 === u[y][4],
            1 === u[y][5],
            u[y][6],
            u[y][7]
          );
          (this.length += d.getTotalLength()),
            (l = [u[y][6], u[y][7]]),
            this.functions.push(d);
        } else if ("a" === u[y][0]) {
          var P = new o(
            l[0],
            l[1],
            u[y][1],
            u[y][2],
            u[y][3],
            1 === u[y][4],
            1 === u[y][5],
            l[0] + u[y][6],
            l[1] + u[y][7]
          );
          (this.length += P.getTotalLength()),
            (l = [l[0] + u[y][6], l[1] + u[y][7]]),
            this.functions.push(P);
        }
        this.partial_lengths.push(this.length);
      }
    },
    C = function (n) {
      var e = this;
      if (
        (t(this, "inst", void 0),
        t(this, "getTotalLength", function () {
          return e.inst.getTotalLength();
        }),
        t(this, "getPointAtLength", function (t) {
          return e.inst.getPointAtLength(t);
        }),
        t(this, "getTangentAtLength", function (t) {
          return e.inst.getTangentAtLength(t);
        }),
        t(this, "getPropertiesAtLength", function (t) {
          return e.inst.getPropertiesAtLength(t);
        }),
        t(this, "getParts", function () {
          return e.inst.getParts();
        }),
        (this.inst = new S(n)),
        !(this instanceof C))
      )
        return new C(n);
    };

  return C;
}

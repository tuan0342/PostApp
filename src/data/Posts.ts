import {Comment, Hashtag, Post, UserPost} from '../base/types/post';

export const like: UserPost[] = [
  {
    name: 'Ngô Văn Tuấn',
    avatar:
      'https://ramenparados.com/wp-content/uploads/2023/03/DarkGathering_000.jpg',
    id: 'adhkakdjlkaf',
  },
  {
    name: 'Đoàn Văn Khanh',
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-anime-nam-toc-trang.jpg',
    id: 'dhasjdfiasjf',
  },
  {
    name: 'Trần Viết Trọng',
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-anime-nam-toc-trang.jpg',
    id: 'djfalsf',
  },
  {
    name: 'Nguyễn Đăng Thực',
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-anime-nam-toc-trang.jpg',
    id: 'ffffffffff',
  },
  {
    name: 'Phạm Thị Phương Nga',
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-anime-nam-toc-trang.jpg',
    id: 'fdafffffffff',
  },
];

export const comment: Comment[] = [
  {
    text: 'chết ồi t đọc manga xog h xem anime có sửa 1 vài chi tiết thấy khó chịu ghê, không hỉu sao hồi trc bth mà h lại thế nhỉ :(',
    timestamp: 1693576526000,
    user: {
      name: 'Trần Viết Trọng',
      avatar:
        'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-anime-nam-toc-trang.jpg',
      id: 'djfalsf',
    },
  },
  {
    text: 'Tổng hợp tất cả con ma mà Yayoi đã thu phục được lẫn chưa thu phục được. Ai không thích spoil thì không nên nhấn vào còn ai không sợ spoil thì cứ thả ga nhé. Nhớ xóa ngoặc. Link: https://imgur(.)com/gallery/5RKHD3L',
    timestamp: 1693662926000,
    user: {
      name: 'Ngô Văn Tuấn',
      avatar:
        'https://ramenparados.com/wp-content/uploads/2023/03/DarkGathering_000.jpg',
      id: 'adhkakdjlkaf',
    },
  },
];

export const postCommunity: Post[] = [
  {
    id: 'yuyiu',
    title: 'Jujutsu kaisen ra mắt ss2',
    cap: 'Hóa ra chính là "như thế" 😐',
    images: [
      'https://ecdn.game4v.com/g4v-content/uploads/2022/08/22102219/Jujutsu-ss2-2-game4v-1661138537-18.jpg',
      'https://www.spieltimes.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-2-episode-1-review-1.jpg',
    ],
    hashtag: ['jujutsukaisen', 'jujutsukaisenss2', 'drama', 'action'],
    timestamp: 1693668446000,
    like: like,
    comment: comment,
    owner: {
      name: 'Ngô Văn Tuấn',
      avatar: 'https://cdn.tuoitre.vn/ttc/r/2021/04/19/nobita-2-1618825067.jpg',
      id: 'adhkakdjlkaf',
      email: 'ngotuan111@gmail.com',
    },
  },
  {
    id: 'lkj',
    title: 'Dark Gathering - bộ phim kinh dị đáng xem',
    cap: `   Jujutsu Kaisen has returned with its second season. 
   With a plethora of thrilling and captivating episodes awaiting fans, the premiere of Season 2 sets the stage for another enthralling adventure. Titled “Hidden Inventory,” the first episode aired on July 6, 2023, delving deep into the history of one of the series’ most intriguing and formidable characters: Satoru Gojo.`,
    images: [
      'https://anime.atsit.in/l/wp-content/uploads/2022/11/ngay-phat-hanh-anime-dark-gathering-vao-mua-he-nam-2023-duoc-tiet-lo-boi-trailer-pv.jpg',
      'https://staticg.sportskeeda.com/editor/2023/06/866f9-16869566550130-1920.jpg',
      'https://a.storyblok.com/f/178900/1920x1080/bc00597910/dark-gathering-episode-2-still.jpg',
      'https://staticg.sportskeeda.com/editor/2023/06/866f9-16869566550130-1920.jpg',
    ],
    timestamp: 1693666859000,
    hashtag: ['darkgathering', 'horror', 'drama', 'action', 'shounen'],
    like: like,
    comment: comment,
    owner: {
      name: 'Đoàn Văn Khanh',
      avatar:
        'https://oca.edu.vn/uploads/images/info/doraemon-trong-tieng-trung-la-gi.png',
      id: 'dhasjdfiasjf',
      email: 'doanvankhanh111@gmail.com',
    },
  },
  {
    id: 'uiyiou',
    title: 'Jujutsu kaisen ra mắt ss2',
    cap: '',
    images: [
      'https://www.spieltimes.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-2-episode-1-review-1.jpg',
    ],
    hashtag: [
      'jujutsukaisen',
      'jujutsukaisenss2',
      'drama',
      'action',
      'jujutsukaisenss2',
      'jujutsukaisenss2',
    ],
    like: like,
    comment: comment,
    timestamp: 1692434213000,
    owner: {
      name: 'Trần Viết Trọng',
      avatar:
        'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/10/5/059f8009221cda21281fd9551614a2b7-1633406035772546090167.jpg',
      id: 'adhkakdjlkaf',
      email: 'ngotuan111@gmail.com',
    },
  },
];

export const postFollowing: Post[] = [
  {
    id: 'lkj',
    title: 'Dark Gathering - bộ phim kinh dị đáng xem',
    cap: `   Jujutsu Kaisen has returned with its second season. 
   With a plethora of thrilling and captivating episodes awaiting fans, the premiere of Season 2 sets the stage for another enthralling adventure. Titled “Hidden Inventory,” the first episode aired on July 6, 2023, delving deep into the history of one of the series’ most intriguing and formidable characters: Satoru Gojo.`,
    images: [
      'https://anime.atsit.in/l/wp-content/uploads/2022/11/ngay-phat-hanh-anime-dark-gathering-vao-mua-he-nam-2023-duoc-tiet-lo-boi-trailer-pv.jpg',
      'https://staticg.sportskeeda.com/editor/2023/06/866f9-16869566550130-1920.jpg',
      'https://a.storyblok.com/f/178900/1920x1080/bc00597910/dark-gathering-episode-2-still.jpg',
      'https://staticg.sportskeeda.com/editor/2023/06/866f9-16869566550130-1920.jpg',
    ],
    timestamp: 1693688126000,
    hashtag: ['darkgathering', 'horror', 'drama', 'action', 'shounen'],
    like: like,
    comment: comment,
    owner: {
      name: 'Đoàn Văn Khanh',
      avatar:
        'https://oca.edu.vn/uploads/images/info/doraemon-trong-tieng-trung-la-gi.png',
      id: 'dhasjdfiasjf',
      email: 'doanvankhanh111@gmail.com',
    },
  },
  {
    id: 'yuyiu',
    title: 'Jujutsu kaisen',
    cap: 'Hóa ra chính là "như thế" 😐',
    images: [
      'https://ecdn.game4v.com/g4v-content/uploads/2022/08/22102219/Jujutsu-ss2-2-game4v-1661138537-18.jpg',
      'https://www.spieltimes.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-2-episode-1-review-1.jpg',
    ],
    hashtag: ['jujutsukaisen', 'jujutsukaisenss2', 'drama', 'action'],
    timestamp: 1693670126000,
    like: like,
    comment: comment,
    owner: {
      name: 'Ngô Văn Tuấn',
      avatar: 'https://cdn.tuoitre.vn/ttc/r/2021/04/19/nobita-2-1618825067.jpg',
      id: 'adhkakdjlkaf',
      email: 'ngotuan111@gmail.com',
    },
  },
  {
    id: 'uiyiou',
    title: 'Dark Gathering - bộ phim kinh dị đáng xem',
    cap: 'Convert epoch to human-readable date and vice versa',
    images: [
      'https://www.spieltimes.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-2-episode-1-review-1.jpg',
    ],
    hashtag: ['jujutsukaisen', 'jujutsukaisenss2', 'drama', 'action'],
    like: like,
    comment: comment,
    timestamp: 1692434213000,
    owner: {
      name: 'Trần Viết Trọng',
      avatar:
        'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/10/5/059f8009221cda21281fd9551614a2b7-1633406035772546090167.jpg',
      id: 'adhkakdjlkaf',
      email: 'ngotuan111@gmail.com',
    },
  },
  {
    id: 'uiyioukk',
    title: 'Dark Gathering - bộ phim kinh dị đáng xem',
    cap: 'Convert epoch to human-readable date and vice versa',
    images: [
      'https://www.spieltimes.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-2-episode-1-review-1.jpg',
    ],
    hashtag: ['jujutsukaisen', 'jujutsukaisenss2', 'drama', 'action'],
    like: like,
    comment: comment,
    timestamp: 1692434213000,
    owner: {
      name: 'Trần Viết Trọng',
      avatar:
        'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/10/5/059f8009221cda21281fd9551614a2b7-1633406035772546090167.jpg',
      id: 'adhkakdjlkaf',
      email: 'ngotuan111@gmail.com',
    },
  },
];

export const hashtagHotList: Hashtag[] = [
  {hashtag: 'romcom', count: 298, lastTimestamp: 1694318743000},
  {hashtag: 'fairytail', count: 418, lastTimestamp: 1694232343000},
  {hashtag: 'romance', count: 309, lastTimestamp: 1694235643000},
  {hashtag: 'jujutsukaisen', count: 362, lastTimestamp: 1694239243000},
  {hashtag: 'onepiece', count: 403, lastTimestamp: 1694239243000},
  {hashtag: 'doraemon', count: 2897, lastTimestamp: 1694239243000},
];

export const hashtagList: string[] = [
  'romcom',
  'romance',
  'jujutsukaisen',
  'fairytail',
  'onepiece',
  'doraemon',
  'nobita',
  'horimiya',
  'chaien',
  'shizuka',
  'MasamichiYaga',
  'SatoruGojo',
  'AtsuyaKusakabe',
  'KiyotakaIjichi',
  'ShokoIeiri',
  'AkariNitta',
  'YujiItadori',
];
